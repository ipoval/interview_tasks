#!/usr/bin/env bash

[[ $1 ]] || { echo 'missing argument' >&2; exit 1; }

date=$(date)
read -p 'enter your note: ' note

if [[ ! $note ]]; then
  echo no input
  exit 1
fi

set -x                                        # debugging on
# get the topic
topic="$1"
set +x

filename="${HOME}/.Trash/${topic}_notest.txt"

echo -n "are you sure (y/n)?"

while [[ ! $answered ]]; do
  read -r -n 1 -s answer
  if [[ $answer = [Yy] ]]; then
    answered="yes"
  elif [[ $answer = [Nn] ]]; then
    answered="no"
  fi
done

if [[ $answered = "no" ]]; then
  exit 1
fi

echo $date: $note >> "$filename"              # allows the spaces to be present in the file name

echo -e
echo +added \'$note\' to $filename

exit 0
