const fs = require("fs");

const txtData = fs.readFileSync("./2-data.txt", "utf-8");

const lines = txtData.split("\n");

// 1st part
const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

let indexes = 0;

lines.forEach((line, i) => {
  const withoutGameNo = line.split(":")[1].trim();
  const colorsWithCounts = withoutGameNo.replaceAll(";", ",");
  const arrayPerGame = colorsWithCounts.split(", ");

  arrayPerGame.every((combo) => {
    const [colorCount, colorName] = combo.split(" ");
    return bag[colorName] && +colorCount <= bag[colorName];
  })
    ? (indexes += i + 1)
    : null;
});

console.log(indexes);

// 2nd part
let sum = 0;

let minPossible = {
  green: 0,
  blue: 0,
  red: 0,
};

lines.forEach((line) => {
  const withoutGameNo = line.split(":")[1].trim();
  const colorsWithCounts = withoutGameNo.replaceAll(";", ",");
  const arrayPerGame = colorsWithCounts.split(", ");

  arrayPerGame.forEach((combo) => {
    const [colorCount, colorName] = combo.split(" ");

    if (minPossible[colorName] < +colorCount) {
      minPossible[colorName] = +colorCount;
    }
  });

  sum += minPossible.blue * minPossible.green * minPossible.red;
  minPossible = {
    green: 0,
    blue: 0,
    red: 0,
  };
});

console.log(sum);
