import "./styles.css";

// elems
let input = document.querySelector("#nums");
let word = document.getElementById("word");
let convert = document.getElementById("convert");
let reset = document.getElementById("reset");

String.prototype.replaceAt = function (index, char) {
  return this.substr(0, index) + char + this.substr(index + char.length);
};

const replaceLastChars = (str, newChars) => {
  newChars.map((char, key) => {
    return (str = str.replaceAt(str.length - (key + 1), char));
  });
  return str;
};

// data
let numsStrings = [
  ["один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"],
  [
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать"
  ],
  [
    "десять",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто"
  ],
  [
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот"
  ],
  "тысяча",
  "один миллион"
];

reset.addEventListener("click", () => {
  input.value = "";
  word.innerHTML = "";
});

let tysyach = replaceLastChars(numsStrings[4], [" "]);

convert.addEventListener("click", () => {
  let num = input.value;
  // let numLength = num.length;
  let numArray = num.split("").reverse();

  let strNum = numArray
    .map((item, key) => {
      // console.log(`${item} is the ${key}st number.`);
      let pronounced = parseInt(item) !== 0;
      let next_num = parseInt(numArray[key - 1]);
      let prev_num = parseInt(numArray[key + 1]);
      let two_case = parseInt(item) === 2;

      let no_thousandCount = 0;

      let ones = pronounced && prev_num !== 1 ? numsStrings[0][item - 1] : "";
      let hundreds = pronounced ? numsStrings[3][item - 1] : "";
      let tens = pronounced
        ? next_num === 0 || parseInt(item) !== 1
          ? numsStrings[2][item - 1]
          : numsStrings[1][next_num - 1]
        : "";
      let thousands = pronounced
        ? prev_num === 1
          ? tysyach
          : `${
              parseInt(item) === 1
                ? replaceLastChars(numsStrings[0][item - 1], ["a", "н"])
                : two_case
                ? replaceLastChars(numsStrings[0][item - 1], ["е"])
                : numsStrings[0][item - 1]
            } 
            ${replaceLastChars(
              numsStrings[4],
              parseInt(item) === 1 ? ["a"] : parseInt(item) < 5 ? ["и"] : [" "]
            )}`
        : tysyach;

      let res = "";

      let numOrder = key + 1;

      switch (numOrder) {
        case 7:
          res += numsStrings[5];
          break;
        case 6:
          res += hundreds;
          break;
        case 5:
          res += tens;
          break;
        case 4:
          let isNoThs =
            parseInt(item) === 0 &&
            prev_num === 0 &&
            parseInt(numArray[key + 2]) === 0;

          res += isNoThs ? "" : thousands;
          break;
        case 3:
          res += hundreds;
          break;
        case 2:
          res += tens;
          break;
        case 1:
          res += ones;
          break;
        default:
          res += "";
      }

      // return numsStrings[0][item - 1];
      // console.log("res is ", res);
      return res;
    })
    .reverse()
    .join(" ");

  word.innerHTML = strNum;
});
