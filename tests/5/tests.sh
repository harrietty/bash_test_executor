#!/bin/bash

# Test for the Name Counter challenge

echo "$ ./code names.txt"
res=$(./code.sh ./tests/associated_files/5/1.txt)

declare -i fails=0

expected='4 Pete
3 Terry
2 Olivia
1 Marsha
1 Anisa'

echo "Expected:"
echo "${expected}"
echo "Actual:"
echo "${res}"

if [[ "${res}" != "${expected}" ]]; then
  ((++fails))
fi

echo "${fails} tests failed"
if [[ $fails -gt 0 ]]; then
  exit 1
else
  exit 0
fi
