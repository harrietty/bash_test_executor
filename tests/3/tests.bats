#!/usr/bin/env bats

# Test for the Range Creator challenge

@test "Creates a range from 1 to 5" {
  result=$(./code.sh -s 1 -e 5)
  expected='1
2
3
4
5'
  [[ $result == $expected ]]
}

@test "Creates a range from 1 to 1" {
  result=$(./code.sh -s 1 -e 1)
  expected='1'
  [[ $result == $expected ]]
}

@test "Creates a range from -4 to 4" {
  result=$(./code.sh -s -4 -e 4)
  expected='-4
-3
-2
-1
0
1
2
3
4'
  [[ $result == $expected ]]
}
