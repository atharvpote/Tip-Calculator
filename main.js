const billInput = document.querySelector("#bill-input");
const tipButtons = document.querySelectorAll(".calculator-select-tip-button");
const defaultTip = document.querySelector("#default-tip");
const customTipInput = document.querySelector("#custom-tip-input");
const numberOfPeopleInput = document.querySelector("#number-of-people-input");
const tipAmountDisplay = document.querySelector("#tip-amount");
const totalAmountDisplay = document.querySelector("#total-amount");
const resetButton = document.querySelector("#reset-button");
const selectTipPercentageClass = "SELECTED";
const selectTipPercentageClassSkin = "calculator-select-tip-button-SELECTED";
const noOfPeopleErrorZone = document.querySelector(
  "#number-of-people-error-zone"
);
const activateNoOfPeopleErrorZone = "number-of-people-error-ACTIVE";

// Event Listeners
billInput.addEventListener("input", () => {
  inputListener();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    removeTipButtonSelection();

    event.currentTarget.classList.add(selectTipPercentageClassSkin);
    event.currentTarget.classList.add(selectTipPercentageClass);

    customTipInput.value = "";

    inputListener();
  });
});

customTipInput.addEventListener("input", () => {
  removeTipButtonSelection();

  customTipInput.classList.add(selectTipPercentageClass);

  if (!customTipInput.value.length)
    customTipInput.classList.remove(selectTipPercentageClassSkin);

  inputListener();
});

numberOfPeopleInput.addEventListener("input", () => {
  numberOfPeopleErrorHandler();
  inputListener();
});

resetButton.addEventListener("click", () => {
  billInput.value = null;
  removeTipButtonSelection();
  defaultTip.classList.add(selectTipPercentageClass);
  defaultTip.classList.add(selectTipPercentageClassSkin);
  customTipInput.value = null;
  numberOfPeopleInput.value = null;
  removeNumberOfPeopleErrorClass();

  inputListener();
});

// functions
function removeTipButtonSelection() {
  tipButtons.forEach((button) => {
    button.classList.remove(selectTipPercentageClassSkin);
    button.classList.remove(selectTipPercentageClass);
  });
}

function getTipPercentage() {
  const percentage = Number.parseInt(
    document.querySelector(`.${selectTipPercentageClass}`).value
  )
    ? Number.parseInt(
        document.querySelector(`.${selectTipPercentageClass}`).value
      )
    : 0;

  return percentage;
}

function getBillAmount() {
  const bill = Number.parseInt(billInput.value)
    ? Number.parseInt(billInput.value)
    : 0;

  return bill;
}

function getNumberOfPeople() {
  const people = Number.parseInt(numberOfPeopleInput.value)
    ? Number.parseInt(numberOfPeopleInput.value)
    : 0;

  return people;
}

function calculateTipAmountPerPerson({
  tipPercentage,
  billAmount,
  numberOfPeople,
}) {
  if (!billAmount || !numberOfPeople) return "";
  if (!tipPercentage) return 0;

  return ((billAmount * tipPercentage) / 100 / numberOfPeople).toFixed(2);
}

function calculateTotalAmountPerPerson({ billAmount, numberOfPeople }) {
  const tipPerPerson = calculateTipAmountPerPerson(getValues());

  if (typeof tipPerPerson === "string") return tipPerPerson;

  return (billAmount / numberOfPeople + tipPerPerson).toFixed(2);
}

function getValues() {
  return {
    tipPercentage: getTipPercentage(),
    billAmount: getBillAmount(),
    numberOfPeople: getNumberOfPeople(),
  };
}

function updateTipAmountPerPerson(amount) {
  tipAmountDisplay.innerText = `$${amount}`;
}

function updateTotalAmountPerPerson(amount) {
  totalAmountDisplay.innerText = `$${amount}`;
}

function inputListener() {
  updateTipAmountPerPerson(calculateTipAmountPerPerson(getValues()));
  updateTotalAmountPerPerson(calculateTotalAmountPerPerson(getValues()));
}

function numberOfPeopleErrorHandler() {
  !Number.parseInt(numberOfPeopleInput.value)
    ? addNumberOfPeopleErrorClass()
    : removeNumberOfPeopleErrorClass();
}

function addNumberOfPeopleErrorClass() {
  noOfPeopleErrorZone.classList.add(activateNoOfPeopleErrorZone);
}

function removeNumberOfPeopleErrorClass() {
  noOfPeopleErrorZone.classList.remove(activateNoOfPeopleErrorZone);
}
