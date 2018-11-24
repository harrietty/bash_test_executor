#!/bin/bash

declare -i start
declare -i end

while getopts "s:e:" opt; do
  case $opt in
    s)
      start="${OPTARG}"
      ;;
    e)
      end="${OPTARG}"
      ;;
  esac
done

for (( i=${start}; i<=${end}; ++i )); do
  echo "$i"
done

exit 0
