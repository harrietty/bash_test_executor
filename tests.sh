#!/bin/bash

# Tests for the sum script

declare -i fails=0

echo "$ ./script.sh 5 10"
res=$(./code.sh 5 10)

if [[ $res -eq 15 ]]; then
  echo "Expected: 15"
  echo "Actual: ${res}"
else
  echo "Expected: 15"
  echo "Actual: ${res}"
  ((++fail))
fi

if [[ $fail -gt 0 ]]; then
  exit 1
else
  exit 0
fi
