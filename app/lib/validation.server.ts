// Type definitions for input objects
interface ExpenseInput {
  title: string;
  amount: string | number;
  date: string | Date;
}

interface CredentialsInput {
  email: string;
  password: string;
}

// Helper validation functions
function isValidTitle(value: string): boolean {
  return !!value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: string | number): boolean {
  const amount = typeof value === "string" ? parseFloat(value) : value;
  return !isNaN(amount) && amount > 0;
}

function isValidDate(value: string | Date): boolean {
  const date = value instanceof Date ? value : new Date(value);
  return !!value && date.getTime() < new Date().getTime();
}

function isValidEmail(value: string): boolean {
  return !!value && value.includes("@");
}

function isValidPassword(value: string): boolean {
  return !!value && value.trim().length >= 6;
}

// Exported validation functions
export function validateExpenseInput(input: ExpenseInput): void {
  const validationErrors: Record<string, string> = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      "Invalid amount. Must be a number greater than zero.";
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = "Invalid date. Must be a date before today.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

export function validateCredentials(input: CredentialsInput): void {
  const validationErrors: Record<string, string> = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
