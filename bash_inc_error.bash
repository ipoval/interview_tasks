# do not provide hash-bang directive
# since this file-script is to be sourced and not run as a command
# this file-script doesnt need to have executable permission
# so do: `chmod a-x inc_error.bash`

# function to handle errors
# redirects STDOUT into STDERR
#   1st arg - error msg to print
#   2nd arg - exit code
error() {
  echo "Error: $1"
  exit $2
} >&2
