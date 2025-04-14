function generateDocument(options) {
  const { baseLength, calculateDigit } = options;

  const numbers = Array.from({ length: baseLength }, () =>
    Math.floor(Math.random() * 10)
  );

  const digit1 = calculateDigit(numbers);
  numbers.push(digit1);

  const digit2 = calculateDigit(numbers);
  numbers.push(digit2);

  return numbers.join("");
}

function calculateModuloDigit(numbers, divisor) {
  const sum = numbers.reduce((acc, curr, index) => {
    return acc + curr * (numbers.length + 1 - index);
  }, 0);

  const remainder = sum % divisor;
  return remainder < 2 ? 0 : divisor - remainder;
}

function generateCPF() {
  return generateDocument({
    baseLength: 9,
    calculateDigit: (numbers) => calculateModuloDigit(numbers, 11),
  });
}

function generateCNPJ() {
  return generateDocument({
    baseLength: 12,
    calculateDigit: (numbers) => {
      const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;

      for (let i = 0; i < numbers.length; i++) {
        sum +=
          numbers[i] * (multipliers[i] || multipliers[i - multipliers.length]);
      }

      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    },
  });
}

chrome.runtime.onMessage.addListener((message, sendResponse) => {
  if (message.action !== "GENERATE_DOCUMENT") return;

  const documentNumber =
    message.docType === "cpf" ? generateCPF() : generateCNPJ();
  const activeElement = document.activeElement;

  activeElement.value = documentNumber;

  const changeEvent = new Event("change", { bubbles: true });
  activeElement.dispatchEvent(changeEvent);

  const inputEvent = new Event("input", { bubbles: true });
  activeElement.dispatchEvent(inputEvent);

  sendResponse({ success: true, method: "field-insertion" });
});
