"use strict";

const fs = require("fs");

const txtData = fs.readFileSync("./1-data.txt", "utf-8");

const lines = txtData.split("\n");

// 1st part
let result = lines
  .map((line) => {
    return line.replace(/[a-z]/g, "");
  })
  .map((line) => line[0] + line[line.length - 1])
  .reduce((sum, line) => sum + Number(line), 0);

console.log(result);

// 2nd part
const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const firstDigits = [];
lines.map((line) => {
  let found = false;
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      firstDigits.push(line[i]);
      found = true;
      break;
    } else {
      for (let numStr in numbers) {
        if (line.startsWith(numStr, i)) {
          firstDigits.push(numbers[numStr]);
          found = true;
          break;
        }
      }
    }
    if (found) break;
  }
});

const lastDigits = [];
lines.map((line) => {
  let found = false;
  for (let i = line.length - 1; i >= 0; i--) {
    if (!isNaN(line[i])) {
      lastDigits.push(line[i]);
      found = true;
      break;
    } else {
      for (let numStr in numbers) {
        if (line.startsWith(numStr, i - numStr.length + 1)) {
          lastDigits.push(numbers[numStr]);
          found = true;
          break;
        }
      }
    }
    if (found) break;
  }
});

// console.log(firstDigits);
// console.log(lastDigits);

const result2 = firstDigits
  .map((num, index) => num + lastDigits[index])
  .reduce((acc, curr) => acc + +curr, 0);

console.log(result2);
