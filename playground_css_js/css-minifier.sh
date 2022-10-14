#!/bin/bash

# Strip comments
awk '!/\/?\*/||/{/' $1 > temp

# Strip leading spaces
sed -e 's/^[\ ]*//g' temp > temp1
rm temp

# Strip newlines
tr -d '\n' < temp1 > temp2
rm temp1

# Strip spaces between colon and property value
sed -e 's/\: /\:/g' temp2 > temp3
rm temp2

# Strip spaces after semi-colons
sed -e 's/\; /\;/g' temp3 > temp4
rm temp3

# Strip spaces between commas
sed -e 's/,\ /,/g' temp4 > temp5
rm temp4

# Strip spaces before and after /
sed -e 's/\ \/\ /\//g' temp5 > temp6
rm temp5

# Strip spaces before { and (
awk '{gsub(/ \{/,"{"); print}' temp6 > temp7
rm temp6
awk '{gsub(/ \(/,"("); print}' temp7 > ${1%.*}.min.css
rm temp7
