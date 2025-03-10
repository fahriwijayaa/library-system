// TEST 1. REVERSE STRING
function reverseAlphabet(input: string): string {
  const alphabets = input.slice(0, -1).split("").reverse().join("");
  const number = input.slice(-1);
  return alphabets + number;
}

const text = "NEGIE1";

console.log("\n# SOAL 1. REVERSE STRING");
console.log("Input String : ", text);
console.log("Output String : ", reverseAlphabet(text));

// TEST 2. LONGEST WORD
function longestWord(sentence: string): string {
  const words = sentence.split(" ");
  let longest = words[0];

  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return `${longest}: ${longest.length} character`;
}

const text2 = "Saya sangat senang mengerjakan soal algoritma";

console.log("\n# SOAL 2. LONGEST WORD");
console.log("Input String : ", text2);
console.log(longestWord(text2));

// TEST 3. COUNT OCCURENCES
function countOccurrences(input: string[], query: string[]): number[] {
  return query.map((q) => input.filter((word) => word === q).length);
}

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

console.log("\n# SOAL 3. COUNT OCCURENCES");
console.log("Input : ", input);
console.log("Query : ", query);
console.log("\nOutput : ", countOccurrences(input, query));

// TEST 4. DIAGONAL DIFFERENCE
function diagonalDifference(matrix: number[][]): number {
  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;

  console.log("\n# SOAL 4. DIAGONAL DIFFERENCE");
  console.log("Matrix =", matrix);
  console.log("");

  const primaryElements: number[] = [];
  const secondaryElements: number[] = [];

  for (let i = 0; i < matrix.length; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][matrix.length - 1 - i];

    primaryElements.push(matrix[i][i]);
    secondaryElements.push(matrix[i][matrix.length - 1 - i]);
  }

  console.log(
    `Diagonal pertama = ${primaryElements.join(" + ")} = ${primaryDiagonal}`
  );
  console.log(
    `Diagonal kedua = ${secondaryElements.join(" + ")} = ${secondaryDiagonal}\n`
  );

  const difference = Math.abs(primaryDiagonal - secondaryDiagonal);
  console.log(
    `Maka hasilnya adalah ${primaryDiagonal} - ${secondaryDiagonal} = ${difference}`
  );

  return difference;
}

diagonalDifference([
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
]);
