#!/usr/bin/env bash

# 1st arg: error msg to print
# 2nd arg: exit code
error() {
  echo "error: $1"
  usage
  exit $2
} >&2

# function returns 0 when its arg is number
# $num_error contains error msg
isnum() {
  declare -r num_re='^[0-9]+$'
  declare -r octal_re='^0([0-8]+)$'
  num_error='ok'

  if [[ $1 =~ $num_re ]]; then
    if [[ $1 =~ $octal_re ]]; then
      num_error="$1 is not a number -> did you mean ${BASH_REMATCH[1]}?"
      return 1;
    fi
    return 0;
  else
    num_error="$1 is not a number"
    return 1;
  fi
  return 0;
}

isnum "08"
echo $num_error