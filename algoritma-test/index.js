// TEST 1. REVERSE STRING
function reverseAlphabet(input) {
    var alphabets = input.slice(0, -1).split("").reverse().join("");
    var number = input.slice(-1);
    return alphabets + number;
}
var text = "NEGIE1";
console.log("\n# SOAL 1. REVERSE STRING");
console.log("Input String : ", text);
console.log("Output String : ", reverseAlphabet(text));
// TEST 2. LONGEST WORD
function longestWord(sentence) {
    var words = sentence.split(" ");
    var longest = words[0];
    for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
        var word = words_1[_i];
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return "".concat(longest, ": ").concat(longest.length, " character");
}
var text2 = "Saya sangat senang mengerjakan soal algoritma";
console.log("\n# SOAL 2. LONGEST WORD");
console.log("Input String : ", text2);
console.log(longestWord(text2));
// TEST 3. COUNT OCCURENCES
function countOccurrences(input, query) {
    return query.map(function (q) { return input.filter(function (word) { return word === q; }).length; });
}
var input = ["xc", "dz", "bbb", "dz"];
var query = ["bbb", "ac", "dz"];
console.log("\n# SOAL 3. COUNT OCCURENCES");
console.log("Input : ", input);
console.log("Query : ", query);
console.log("\nOutput : ", countOccurrences(input, query));
// TEST 4. DIAGONAL DIFFERENCE
function diagonalDifference(matrix) {
    var primaryDiagonal = 0;
    var secondaryDiagonal = 0;
    console.log("\n# SOAL 4. DIAGONAL DIFFERENCE");
    console.log("Matrix =", matrix);
    console.log("");
    var primaryElements = [];
    var secondaryElements = [];
    for (var i = 0; i < matrix.length; i++) {
        primaryDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][matrix.length - 1 - i];
        primaryElements.push(matrix[i][i]);
        secondaryElements.push(matrix[i][matrix.length - 1 - i]);
    }
    console.log("Diagonal pertama = ".concat(primaryElements.join(" + "), " = ").concat(primaryDiagonal));
    console.log("Diagonal kedua = ".concat(secondaryElements.join(" + "), " = ").concat(secondaryDiagonal, "\n"));
    var difference = Math.abs(primaryDiagonal - secondaryDiagonal);
    console.log("Maka hasilnya adalah ".concat(primaryDiagonal, " - ").concat(secondaryDiagonal, " = ").concat(difference));
    return difference;
}
diagonalDifference([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
]);
