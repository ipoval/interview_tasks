require "socket"

# Connection creates the socket and accepts new connections
class Connection

  attr_accessor :path

  def initialize(path:)
    @path = path
    File.unlink(path) if File.exists?(path)
  end

  def server
    @server ||= UNIXServer.new(@path)
  end

  def on_request
    socket = server.accept
    yield(socket)
    socket.close
  end
end


# AppServer logs incoming requests and renders a view in response
class AppServer

  attr_reader :connection
  attr_reader :view

  def initialize(connection:, view:)
    @connection = connection
    @view = view
  end

  def run
    while true
      connection.on_request do |socket|
        while (line = socket.readline) != "\r\n"
          puts line
        end
        socket.write(view.render)
      end
    end
  end

end

# TimeView simply provides the HTTP response
class TimeView
  def render
%[HTTP/1.1 200 OK

The current timestamp is: #{ Time.now.to_i }

]
  end
end


AppServer.new(connection: Connection.new(path: '/tmp/socktest.sock'), view: TimeView.new).run


__END__

# RUN WITH: nginx -c /tmp/nginx.conf

# Run nginx as a normal console program, not as a daemon
daemon off;

# Log errors to stdout
error_log /dev/stdout info;

events {} # Boilerplate

http {

  # Print the access log to stdout
  access_log /dev/stdout;

  # Tell nginx that there's an external server called @app living at our socket
  upstream app {
    server unix:/tmp/socktest.sock fail_timeout=0;
  }

  server {

    # Accept connections on localhost:2048
    listen 2048;
    server_name localhost;

    # Application root
    root /tmp;

    # If a path doesn't exist on disk, forward the request to @app
    try_files $uri/index.html $uri @app;

    # Set some configuration options on requests forwarded to @app
    location @app {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;
      proxy_pass http://app;
    }

  }
}
