#!/usr/bin/env bash

# 1st arg: error msg to print
# 2nd arg: exit code

function usage() {
  cat <<END
count [-r] [-b n] [-s n] stop

Print each number up to stop, beginning at 0
  -b: number to begin with (default: 0)
  -h: show this help message
  -r: reverses the count
  -s: sets step size (default: 1)
END
}

source "$(dirname $0)/inc_error.bash"

declare reverse=""
declare -i begin=0
declare -i step=1

while getopts ":hb:s:r" opt; do
  case $opt in
    r)
      reverse="yes"
      ;;
    h)
      usage
      exit 0
      ;;
    :)
      error "Option -${OPTARG} is missing and argument" 2
      usage
      ;;
    \?)
      error "Unknown option -${OPTARG}" 3
      usage
      ;;
  esac
done

# function returns 0 when its arg is number
# $num_error contains error msg
# example: isnum "08"
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

echo $num_error
