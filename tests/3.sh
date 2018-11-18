#!/bin/bash

# Test for the Range Creator challenge

declare -i fails=0

echo "$ ./script.sh -s 1 -e 5"
res=$(./code.sh -s 1 -e 5)
expected='1
2
3
4
5'

if [[ "${res}" ==  "${expected}" ]]; then
  echo "Expected:"
  echo "${expected}"
  echo "Actual:"
  echo "${res}"
else
  echo "Expected:"
  echo "${expected}"
  echo "Actual:"
  echo "${res}"
  ((++fails))
fi

echo "${fails} tests failed"
if [[ $fails -gt 0 ]]; then
  exit 1
else
  exit 0
fi