interface DocumentOptions {
  baseLength: number;
  calculateDigit: (numbers: number[]) => number;
}

function generateDocument(options: DocumentOptions): string {
  const { baseLength, calculateDigit } = options;

  const numbers: number[] = Array.from({ length: baseLength }, () =>
    Math.floor(Math.random() * 10)
  );

  const digit1: number = calculateDigit(numbers);
  numbers.push(digit1);

  const digit2: number = calculateDigit(numbers);
  numbers.push(digit2);

  return numbers.join("");
}

function calculateModuloDigit(numbers: number[], divisor: number): number {
  const sum: number = numbers.reduce((acc: number, curr: number, index: number) => {
    return acc + curr * (numbers.length + 1 - index);
  }, 0);

  const remainder: number = sum % divisor;
  return remainder < 2 ? 0 : divisor - remainder;
}

function generateCPF(): string {
  return generateDocument({
    baseLength: 9,
    calculateDigit: (numbers: number[]) => calculateModuloDigit(numbers, 11),
  });
}

function generateCNPJ(): string {
  return generateDocument({
    baseLength: 12,
    calculateDigit: (numbers: number[]) => {
      const multipliers: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let sum: number = 0;

      for (let i = 0; i < numbers.length; i++) {
        sum +=
          numbers[i] * (multipliers[i] || multipliers[i - multipliers.length]);
      }

      const remainder: number = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    },
  });
}

export { generateCNPJ, generateCPF }