#!/bin/bash

# solution for the Name Counter challenge

filename="${1}"

echo "$(cat ${filename} | tr ',' "\n" | sort | uniq -c | sort -nr | awk '{$1=$1}1')"

exit 0
