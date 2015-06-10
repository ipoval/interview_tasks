#!/usr/bin/env bash

# script that reduces account-creation tedium

[[ $1 ]] || { echo 'missing argument: username' >&2; exit 1; }

useradd -m $1
passwd $1
mkdir -p /shared/$1
chown $1.users /shared/$1
chmod 775 /shared/$1
ln -s /shared/$1 /home/$1/shared
chown $1.users /home/$1/shared

echo "account created: /shared/${1}"

exit 0
