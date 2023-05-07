const weight = document.querySelector('.weight');
const height = document.querySelector('.height');
const result = document.querySelector('.result');
const resultText = document.querySelector('.resultText');
const weightNum = document.querySelector('.weightNum');
const heightNum = document.querySelector('.heightNum');
const form = document.querySelector('form');
const units = document.querySelector('.units');
const inches = document.querySelector('.inches');

form.addEventListener("input", e => {
  e.preventDefault();
});

let mood = "metric";

units.addEventListener("input", () => {
  if (units.value === "metric") {
    mood = "metric";
    inches.style.display = "none";
    height.placeholder = "CM";
    weight.placeholder = "KG";
    height.value = "";
    weight.value = "";
    inches.value = "";
  } else {
    mood = "us";
    inches.style.display = "block";
    height.placeholder = "Feet";
    weight.placeholder = "Pounds";
    height.value = "";
    weight.value = "";
    inches.value = "";
  }
  resultBMI();
});

weight.addEventListener("input", resultBMI);
height.addEventListener("input", resultBMI);
inches.addEventListener("input", resultBMI);

function resultBMI() {
  let calc;
  if (mood === "metric") {
    calc = height.value / 100;
    calc = Number(weight.value) / (calc * calc);
  } else if (mood === "us") {
    let footToM = height.value / 3.28;
    let inchesToM = inches.value / 39.37;
    calc = footToM + inchesToM;
    let poundToKG = weight.value / 2.2046;
    calc = poundToKG / (calc * calc);
  }

  if (isFinite(calc)) {
    result.textContent = calc.toFixed(1);

    if (calc <= 18.4) {
      resultText.textContent = "Underweight";
      resultText.style.color = "yellow";
      result.style.color = "yellow";
    } else if (calc <= 24.9) {
      resultText.textContent = "Normal";
      resultText.style.color = "green";
      result.style.color = "green";
    } else if (calc <= 39.9) {
      resultText.textContent = "Overweight";
      resultText.style.color = "orange";
      result.style.color = "orange";
    } else {
      resultText.textContent = "Obese";
      resultText.style.color = "red";
      result.style.color = "red";
    }
  } else {
    result.textContent = "";
    resultText.textContent = "";
  }
};
