#!/usr/bin/env bats

# Tests for the Sum of Arguments challenge

@test "addition of 5 and 10" {
  result="$(./code.sh 5 10)"
  [ "$result" -eq 15 ]
}

@test "addition of 12 and 99" {
  result="$(./code.sh 12 99)"
  [ "$result" -eq 111 ]
}

@test "addition of 8 and 50" {
  result="$(./code.sh 8 50)"
  [ "$result" -eq 58 ]
}

@test "addition of 34576 and 98763" {
  result="$(./code.sh 34576 98763)"
  [ "$result" -eq 133339 ]
}

@test "addition of 10 and -5" {
  result="$(./code.sh 10 -5)"
  [ "$result" -eq 5 ]
}

@test "addition of 5 and -20" {
  result="$(./code.sh 5 -20)"
  [ "$result" -eq -15 ]
}
