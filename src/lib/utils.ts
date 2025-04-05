import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function generateCPF(): string {
  const numbers = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  );

  const digit1 = calculateDigit(numbers);
  numbers.push(digit1);

  const digit2 = calculateDigit(numbers);
  numbers.push(digit2);

  return numbers.join("");
}

function calculateDigit(numbers: number[]): number {
  const sum = numbers.reduce((acc, curr, index) => {
    return acc + curr * (numbers.length + 1 - index);
  }, 0);

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function generateCNPJ(): string {
  const numbers = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  );

  const digit1 = calculateCNPJDigit(numbers);
  numbers.push(digit1);

  const digit2 = calculateCNPJDigit(numbers);
  numbers.push(digit2);

  return numbers.join("");
}

function calculateCNPJDigit(numbers: number[]): number {
  const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i] * (multipliers[i] || multipliers[i - 12]);
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function cpfMask(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{3})(\d)/, '$1.$2');
  value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');

  return value;
}

function cnpjMask(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");
  
  return value;
}

export { generateCPF, generateCNPJ, cpfMask, cnpjMask };
