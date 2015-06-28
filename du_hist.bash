#!/usr/local/bin/bash

# du histogram version
# prints the current disk usage as a histogram
# run in foreground: bash ./du_hist.bash
# run in background since it may take some time for big directories:
#                    nice ./du_hist.bash &

# this script is compatible with Bash 4 and higher which is not installed by default on many Linux-family systems
# use `brew install bash` to install Bash 4 on Mac OS X

source "$(dirname $0)/inc_error.bash"

# make tempfile BSD and Linux compatible
# if error msg is raised with the first call, we will redirect it
# to /dev/null
uni_mktemp() {
  mktemp || mktemp -t hist
} 2> /dev/null

# to support associative arrays - only available in bash 4
(( BASH_VERSINFO[0] < 4 )) && error 'script is only for BASH >= v.4' 1

# to hold location of the tmp file for inter-processes communication in the script
declare -r tempfile=$(uni_mktemp) || error 'cannt create temp file' 2
echo "Tempfile: ${tempfile}"
declare -A file_sizes               # associative array to keep all the file sizes of different dirs
declare -a dir_names_sorted_by_size # array of dir names sorted by size after the du command output
declare -ir term_cols=$(tput cols)  # how wide the terminal is
declare -i max_file_len=0           # longest file name
declare -i mas_size=0               # largest file
declare -i total_size=0             # total file size
declare -i length                   # length of each line
declare -i percentage               # percentage of each line

drawline() {
  declare line=''
  declare char='-'
  for (( i=0; i<$1; ++i )); do
    line="${line}${char}"
  done
  printf "%s" "$line"
}

# read the output from du into associative array
# calculate: total size, maximum size and max filename length
read_filesizes() {
  while read -r size name; do
    file_sizes["$name"]="$size"
    dir_names_sorted_by_size+=("$name")
    (( total_size += size ))
    (( max_size < size )) && (( max_size=size ))
    (( max_file_len < ${#name} )) && (( max_file_len=${#name} ))
  done
}

# run du to get filesizes
# make du run BSD and Linux compatible
{ du -d 0 */ || du --max-depth 0 *; } | sort -gr 2>/dev/null > "$tempfile"

read_filesizes < "$tempfile"

declare -i cols="term_cols - max_file_len - 10" # how many columns may the line take up

# LOOP OVER ITEMS BUT SINCE HASH MAP RETURNS THE KEYS IN ANY ORDER IT WONT BE SORTED
# for k in "${!file_sizes[@]}"; do
#   (( length=cols * file_sizes[$k] / max_size ))
#   (( percentage=100 * file_sizes[$k] / total_size ))
#   printf "%-${max_file_len}s | %3d%% | %s\n" "$k" "$percentage" $(drawline $length)
# done

# LOOP OVER ITEMS SORTED BY SIZE
declare -i sorted_len=${#dir_names_sorted_by_size[@]}
declare current_dir_name
for (( i=0; i<${#dir_names_sorted_by_size[@]}; i++ )); do
  current_dir_name="${dir_names_sorted_by_size[$i]}"
  (( length=cols * file_sizes[$current_dir_name] / max_size ))
  (( percentage=100 * file_sizes[$current_dir_name] / total_size ))
  printf "%-${max_file_len}s | %3d%% | %s\n" "$current_dir_name" "$percentage" $(drawline $length)
done

printf "%d Directories\n" "${#file_sizes[@]}"
printf "Total size: %d blocks\n" "$total_size"

rm "$tempfile"
exit 0
