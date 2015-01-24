require 'webrick'

server = WEBrick::HTTPServer.new(Port: 1991)

server.mount_proc('/') do |request, response|
  response['Content-Type'] = 'test/plain; charset=UTF-8'
  response.body << Time.now.ctime
  response.body << "\n"
  response.body << Blog.first.posts.first.to_s
end

class Blog
  def self.first
    self.new
  end

  def posts
    [Post.new, Post.new]
  end
end

class Post
  attr_accessor :body

  def initialize
    @body = "Post body #{Time.now.ctime}"
  end

  def to_s
    <<-EOL
    Title: is comming
    Body: #@body
    EOL
  end
end

server.start

__END__


