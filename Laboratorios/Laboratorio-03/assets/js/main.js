// DOM variables
let numbers; 
let plus; 
let minus; 
let multiply; 
let divide; 
let del; 
let reset; 
let equal; 
let displayText; 
let historyList; 

const bindElements = () => {
    // Numbers
    numbers = document.querySelectorAll(".number");
    // Operations
    plus = document.querySelector("#plus");
    minus = document.querySelector("#minus");
    multiply = document.querySelector("#times");
    divide = document.querySelector("#divide");
    // Function buttons
    del = document.querySelector(".delete-button");
    reset = document.querySelector(".reset-button");
    equal = document.querySelector(".equals-button");
    // Display information
    displayText = document.querySelector(".calculator-screen-text");
    historyList = document.querySelector(".history-list");
}

const bindListeners = () => {
    // Numbers listener
    numbers.forEach((number) => {
        number.addEventListener("click", () => {
            if (checkError()) {
                displayText.innerHTML = "";
              }
              displayText.innerHTML += number.innerHTML;

            // Assigning values to the logical variables
            const firstNumber = displayText.innerHTML.split(/[\+\-\*\/]/)[0];
            const secondNumber = displayText.innerHTML.split(/[\+\-\*\/]/)[1];

            // Verifying wether the number is larger than 9 digits
            // First verifies wether it is null or not by 'firstNumber?' if it is not null then
            // its length will be evaluated
            if (firstNumber?.length > 9 || secondNumber?.length > 9) {
                // slice(0,-1) means that it will contain all the elements of the original array except the last one
                // if it was .slice(0,-2) it woudl be all the elements except the last two
                displayText.innerHTML = displayText.innerHTML.slice(0, -1);
            }

            // Verifying if there is more than one decimal point
            const dotsFirst = firstNumber.match(/\./g); // Saves in a new array all the matches for a decimal point
            if (dotsFirst && dotsFirst.length > 1) {
                displayText.innerHTML = displayText.innerHTML.slice(0, -1);
            }

            // Verigying wether there is a second number and more parameters
            if (secondNumber) {
                const dotsSecond = secondNumber.match(/\./g);
              
                if (dotsSecond && dotsSecond.length > 1) {
                  displayText.innerHTML = displayText.innerHTML.slice(0, -1);
                }
              }
          });
    });

    // Operators listener
    const operators = {
        plus,
        minus,
        multiply,
        divide,
    };

    for (const operator in operators) {
        // For every click on a operator button, it'll be added on the array of displayText 
        operators[operator].addEventListener("click", () => {
            if (!checkError() && displayText.innerHTML !== "") {
                displayText.innerHTML += operators[operator].innerHTML;
            }
            const operatorsInDisplay = displayText.innerHTML.match(/[\+\-\*\/]/g);
            if (operatorsInDisplay && operatorsInDisplay.length > 1) {
                displayText.innerHTML = displayText.innerHTML.slice(0, displayText.innerHTML.length - 1);
              }
          });
    }

    // Function buttons listeners
    del.addEventListener("click", () => {
        if (!checkError()) {
          displayText.innerHTML = displayText.innerHTML.slice(0, -1);
        }
      });
    reset.addEventListener("click", () => {
        displayText.innerHTML = "";
    });
    equal.addEventListener("click", () => {
        operateAndShow();
    });

    // Load listener
    document.addEventListener("DOMContentLoaded", () => {
        const historyItems = getHistoryItemsFromLocalStorage();
        historyItems.forEach((item) => renderHistoryItem(item));
      });
}

// Helpers
const calculate = (a, b, operator) => {
    switch(operator){
        case "+":
            return a+b; 
        case "-":
            return a-b;
        case "*":
            return a*b; 
        case "/":
            return a/b;
    }
}
const operateAndShow = () => {
    try {
        // Obtain values from the HTML element 'displayText' and save them in variables
        const firstNumber = displayText.innerHTML.split(/[\+\-\*\/]/)[0];
        const secondNumber = displayText.innerHTML.split(/[\+\-\*\/]/)[1];
        const operator = displayText.innerHTML.match(/[\+\-\*\/]/)[0];
        // Send values to the 'calculate' function
        const result = calculate(
            parseFloat(firstNumber),
            parseFloat(secondNumber),
            operator
          );
        const roundedResult = Math.round(result * 10000) / 10000;
        if (!checkError()) {
            displayText.innerHTML = roundedResult;
            console.log(roundedResult);
            // Dinamic render   
            const historyItem = `${firstNumber} ${operator} ${secondNumber} = ${roundedResult}`;
            renderHistoryItem(historyItem);
            addHistoryItemToLocalStorage(historyItem);
          }
    } catch (e) {
        displayText.innerHTML = "";
    }
};
const checkError = () => {
    if (
        displayText.innerHTML === "Error" ||
        displayText.innerHTML === "Infinity" ||
        displayText.innerHTML === "undefined" ||
        displayText.innerHTML === "NaN"
      ){
        return true;
    }
};

// Dinamic render
const renderHistoryItem = (item) => {
    const historyItem = document.createElement("li");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = item;

    if (!checkError()) {
        historyList.prepend(historyItem);
    }
    if (historyList.children.length > 9) {
        historyList.removeChild(historyList.lastChild);
      }
};

// Local storage
const getHistoryItemsFromLocalStorage = () => {
    const historyItems = JSON.parse(localStorage.getItem("historyItems")) || [];
    return historyItems
};
const addHistoryItemToLocalStorage = (item) => {
    if (!checkError()) {
        const historyItems = getHistoryItemsFromLocalStorage(); 
        historyItems.push(item);
        if (historyItems.length > 9) {
            historyItems.shift(); // Removes the first element of the array
        }
        localStorage.setItem("historyItems", JSON.stringify(historyItems));
    }
};

let main = () => {
    bindElements(); 
    bindListeners(); 
}

window.onload = main();