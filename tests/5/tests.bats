#!/usr/bin/env bats

# Test for the Name Counter challenge

@test "Orders the names by occurrences" {
  result=$(./code.sh ./tests/associated_files/1.txt)
  expected='4 Pete
3 Terry
2 Olivia
1 Marsha
1 Anisa'
  [[ "$result" == "$expected" ]]
}
