const displayOutput = document.querySelector(".num");
const buttons = document.querySelector(".buttons");

let currNum = 0;
let prevNum = 0;
let result = null;
let operator = null;

const calculator = {
  plus: (num1, num2) => num1 + num2,
  sub: (num1, num2) => num1 - num2,
  div: (num1, num2) => num1 / num2,
  mul: (num1, num2) => num1 * num2,
};

const numBtnActions = {
  showDisplay: (num) => (displayOutput.value = num),
  setCurrNum: (num) => (currNum = num),
  setPrevNum: (num) => (prevNum = 1 * num),
  addPoint() {
    if (!currNum.toString().includes(".")) numBtnActions.setCurrNum(currNum + ".");
    this.showDisplay(currNum);
  },
};

operatorBtnActions = {
  assignment: (sign) => (operator = sign),
  calculate: (num1, num2) => {
    if (operator) {
      result = calculator[operator](num1, num2);
      operator = null;
      // 소수 계산 정수 계산 분기
      if (result.toString().includes(".")) {
        result = result.toFixed(10) * 1;
      }
      numBtnActions.setCurrNum(result);
      numBtnActions.setPrevNum(0);
      numBtnActions.showDisplay(result);
    }
  },
  clear: (isAllClear) => {
    if (isAllClear) {
      numBtnActions.setCurrNum(0);
      numBtnActions.setPrevNum(0);
      operator.assignment(null);
    } else {
      numBtnActions.setCurrNum(0);
    }
    numBtnActions.showDisplay(currNum);
  },
};

function handleButtonClick(e) {
  switch (e.target.name) {
    case "number":
      // 방금 연산하고 새로운 숫자 받을 시 초기화
      if (!prevNum && currNum === result) {
        numBtnActions.setCurrNum(0);
        numBtnActions.showDisplay(currNum);
      }
      numBtnActions.setCurrNum(1 * ("" + currNum + e.target.value));
      numBtnActions.showDisplay(currNum);
      break;
    case "operator":
      operatorBtnActions.assignment(e.target.value);
      if (prevNum && currNum && operator) {
        operatorBtnActions.calculate(prevNum, currNum);
      }
      numBtnActions.setPrevNum(currNum);
      numBtnActions.setCurrNum(0);

      break;
    case "equal":
      operatorBtnActions.calculate(prevNum, currNum);
      break;
    case "clear":
      const isAC = !!(currNum === 0 && prevNum && operator);
      operatorBtnActions.clear(isAC);
      break;
    case "point":
      numBtnActions.addPoint();
      break;
    case "delete":
      const delCurrNum = currNum.toString().slice(0, currNum.toString().length - 1);
      if (!delCurrNum) numBtnActions.setCurrNum(0);
      else numBtnActions.setCurrNum(delCurrNum);
      numBtnActions.showDisplay(currNum);
      break;
  }

  console.log("prev: ", prevNum, operator, "curr: ", currNum, "result: ", result);
}

buttons.addEventListener("click", handleButtonClick);
document.addEventListener("keydown", (e) => {
  const key = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "plus",
    "-": "sub",
    "*": "mul",
    "/": "div",
    ".": "point",
    Enter: "equal",
    Backspace: "delete",
    Escape: "clear",
  };

  if (key[e.key]) document.querySelector(`button[value='${key[e.key]}']`).click();
});
