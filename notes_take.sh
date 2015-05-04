#!/usr/bin/env bash

# simple note tacking script
# author: @ipoval

[[ $1 ]] || { echo 'missing argument' >&2; exit 1; }

set -x # debugging on
declare -r date=$(date)
declare -r topic="$1"
set +x # debugging off

declare notesdir=${NOTESDIR:-$HOME}

if [[ ! -d $notesdir ]]; then
  mkdir -- "${notesdir}" 2> /dev/null || { echo "cannot make directory ${notesdir}"; exit 1; }
fi

read -p 'enter your note: ' note
if [[ ! $note ]]; then
  echo no input >&2;
  exit 1
fi

declare -r notesdir=${NOTESDIR:-$HOME}
declare -r filename="${notesdir}/.Trash/${topic}_notest.txt"

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
