#!/usr/bin/env bash

# a simple number-guessing console game

declare -ir target=$(( ($RANDOM % 100) + 1 )) # get random number 0 < target <= 100
declare -i guess=0                            # user's guess

until (( guess == target )); do
  read -p 'Take a guess for a random number: ' guess

  (( guess )) || continue # if guess is 0 -> continue

  if (( guess < target )); then
    echo 'Higher!'
  elif (( guess > target )); then
    echo 'Lower!'
  else
    echo 'correct' $target
  fi
done

exit 0;
