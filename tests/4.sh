#!/bin/bash

# Test for the Word Finder challenge

echo "$ ./code -s bar words.txt"
res=$(./code.sh -s bar ./tests/associated_files/4/1.txt)

declare -i fails=0

echo "Expected: 5"
echo "Actual: ${res}"

if [[ $res != "5" ]]; then
  ((++fails))
fi

echo "${fails} tests failed"
if [[ $fails -gt 0 ]]; then
  exit 1
else
  exit 0
fi
