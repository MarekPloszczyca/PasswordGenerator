const slider = document.querySelector("input");
const number = document.getElementById("number");
const optionInput = document.querySelectorAll("input[type=checkbox]");
const difficultySquares = Array.from(
  document.getElementsByClassName("difficulty")
);
const generator = document.getElementById("confirmation");
const generatedPassword = document.getElementById("pass");
const copyPassword = document.getElementById("icon");

const alphabet = "qwertyuiopasdfghjklzxcvbnm";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=~:;<>?/|";

let levelIndicators = [];
let generatorBag = "";

number.innerHTML = slider.value;

slider.oninput = function () {
  number.innerHTML = this.value;
  this.style.background = `linear-gradient(to right, rgb(65, 249, 188) ${
    (this.value / this.max) * 100
  }%, rgb(14, 14, 22) ${(this.value / this.max) * 100}%)`;
};

function test(focus) {
  if (focus.target.checked == true) {
    difficultySquares[0].className = "level";
    levelIndicators.unshift(difficultySquares[0]);
    difficultySquares.shift();
    switch (focus.target.value) {
      case "uppercase":
        generatorBag += alphabet.toUpperCase();
        break;
      case "lowercase":
        generatorBag += alphabet;
        break;
      case "numbers":
        generatorBag += numbers;
        break;
      case "symbols":
        generatorBag += symbols;
        break;
    }
  } else if (focus.target.checked == false) {
    levelIndicators[0].className = "difficulty";
    difficultySquares.unshift(levelIndicators[0]);
    levelIndicators.shift();
    switch (focus.target.value) {
      case "uppercase":
        generatorBag = generatorBag.replace(alphabet.toUpperCase(), "");
        break;
      case "lowercase":
        generatorBag = generatorBag.replace(alphabet, "");
        break;
      case "numbers":
        generatorBag = generatorBag.replace(numbers, "");
        break;
      case "symbols":
        generatorBag = generatorBag.replace(symbols, "");
        break;
    }
  }
}

function generateHandler() {
  let password = "";
  if (slider.value == 0 || generatorBag.length == 0) {
    return;
  }
  let i = 0;
  while (i < slider.value) {
    password +=
      generatorBag[Math.round(Math.random() * (generatorBag.length - 1))];
    i++;
  }
  //slider.value >= 17
   // ? (generatedPassword.style.fontSize = "calc()")
    //: (generatedPassword.style.fontSize = "1.2em");

  generatedPassword.textContent = password;
  generatedPassword.style.color = "white";
}
function copyHandler() {
  generatedPassword.style.color = "white";
  if (
    generatedPassword.textContent == "P4$sW0RD!" ||
    generatedPassword.textContent == "There is nothing to copy" ||
    generatedPassword.textContent == "Password copied to the clipboard"
  ) {
    return (generatedPassword.textContent = "There is nothing to copy");
  }
  navigator.clipboard.writeText(generatedPassword.textContent);
  generatedPassword.textContent = "Password copied to the clipboard";
}

optionInput.forEach((element) =>
  element.addEventListener("click", test.bind())
);
generator.addEventListener("click", generateHandler.bind());
copyPassword.addEventListener("click", copyHandler.bind());
