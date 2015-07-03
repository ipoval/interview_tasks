#!/usr/bin/env bash

# script that reduces account-creation tedium

[[ $1 ]] || { echo 'missing argument: username' >&2; exit 1; }

while getopts ":a:b" opt; do
  case $opt in
    a)
      echo 'creating account ...'

      useradd -m $1
      passwd $1
      mkdir -p /shared/$1
      chown $1.users /shared/$1
      chmod 775 /shared/$1
      ln -s /shared/$1 /home/$1/shared
      chown $1.users /home/$1/shared

      echo "account created: /shared/${1}"
      exit 0;
      ;;
    b)
      echo 'creating home directory for a user on the file server ...'

      cp -R /etc/skel /home/$2
      chown -R $2.$2 /home/$2
      chmod 751 /home/$2 # this permission will make sure that nginx can access the folder to server user's content
      echo "Unless you saw an error, everything is good."

      exit 0;
      ;;
    :)
      echo "Option -${OPTARG} is missing and argument" >&2;
      exit 1;
      ;;
    \?)
      echo "Unknown option -${OPTARG}" >&2;
      exit 1;
      ;;
  esac
done
