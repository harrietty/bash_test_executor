#!/bin/bash

# solution for the Word Finder challenge

term=

while getopts "s:" opt; do
  case $opt in
    s)
      term="${OPTARG}"
      ;;
  esac
done

shift $(( $OPTIND - 1 ))

filename="${1}"

echo $(grep -o "${term}" "${filename}" | wc -l | tr -d ' ')
