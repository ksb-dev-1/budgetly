interface InputType {
  title: string;
  amount: string;
  date: string;
}

interface ValidationErrors {
  title?: string;
  amount?: string;
  date?: string;
}

export function validateExpenseInput(input: InputType): {
  title: string;
  amount: number;
  date: Date;
} {
  const validationErrors: ValidationErrors = {};

  const { title, amount, date } = input;

  // Validate title
  if (!isValidTitle(title)) {
    validationErrors.title =
      "Invalid expense title. Must be at most 30 characters long.";
  }

  // Validate amount (make sure it's a valid positive number)
  if (!isValidAmount(amount)) {
    validationErrors.amount =
      "Invalid amount. Must be a number greater than zero.";
  }

  // Validate date (check if it's a valid date before today)
  if (!isValidDate(date)) {
    validationErrors.date = "Invalid date. Must be a date before today.";
  }

  // If there are any validation errors, throw them
  if (Object.keys(validationErrors).length > 0) {
    // Return the errors as an object instead of throwing them as a string
    throw validationErrors;
  }

  // Convert the valid data and return it
  return {
    title,
    amount: parseFloat(amount), // Convert amount to number
    date: new Date(date), // Convert date to Date object
  };
}

// Example validation functions (you can replace with your actual logic)
function isValidTitle(value: string): boolean {
  return value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: string): boolean {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

function isValidDate(value: string): boolean {
  const parsedDate = new Date(value);
  return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
}
