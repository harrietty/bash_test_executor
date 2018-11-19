#!/bin/bash

# Tests for the Greatest Argument challenge

declare -i fails=0

echo "$ ./script.sh 5 10 33 1 3 9"
res=$(./code.sh 5 10 33 1 3 9)

if [[ $res -eq 33 ]]; then
  echo "Expected: 33"
  echo "Actual: ${res}"
else
  echo "Expected: 33"
  echo "Actual: ${res}"
  ((++fails))
fi

echo "${fails} tests failed"
if [[ $fails -gt 0 ]]; then
  exit 1
else
  exit 0
fi