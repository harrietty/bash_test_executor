#!/bin/bash

# An example of user input which is intended to be a script
# that returns the largest number of the arguments given

declare -i greatest

for arg in "${@}"; do
  if [[ $arg =~ ^[0-9-]+$ ]]; then
    if [[ ! $greatest || $arg -gt $greatest ]]; then
      greatest=$arg
    fi
  fi
done

echo $greatest
exit 0
