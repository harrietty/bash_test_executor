#!/usr/bin/env bats

# Tests for the Greatest Argument challenge

@test "Largest number of 5 10 33 1 3 9" {
  result=$(./code.sh 5 10 33 1 3 9)
  [ "$result" -eq 33 ]
}

@test "Largest number of -7 -8 -2 1 -33" {
  result=$(./code.sh -7 -8 -2 1 -33)
  [ "$result" -eq 1 ]
}

@test "Largest number of -99 -77 -33 -6 -43" {
  result=$(./code.sh -99 -77 -33 -6 -43)
  [ "$result" -eq -6 ]
}

@test "Largest number of 108" {
  result=$(./code.sh 108)
  [ "$result" -eq 108 ]
}
