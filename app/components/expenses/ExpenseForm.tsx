import { Expense } from "@prisma/client";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

interface ValidationErrors {
  [key: string]: string;
}

export default function ExpenseForm({
  text,
  expenseData,
  paramsId,
  method,
}: {
  text: string;
  expenseData?: Expense | undefined;
  paramsId?: string | undefined;
  method?: string;
}) {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationErrors = useActionData<ValidationErrors | undefined>();
  const navigation = useNavigation();

  if (paramsId && !expenseData) {
    return (
      <div className="border border-tertiary p-8 w-full bg-primary flex flex-col items-center justify-center">
        <p>Invalid expense id!</p>

        <Link
          to=".."
          aria-label="Close"
          className="bg-rose-600 w-[100px] text-center hover:bg-rose-500 transition-colors mt-8 px-3 py-2 font-semibold"
        >
          Close
        </Link>
      </div>
    );
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date.toISOString(),
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="w-full">
      <Form
        method={method === "PATCH" ? "patch" : "post"}
        className="border border-tertiary p-8 w-full bg-primary shadow-[0_8px_16px_#000]"
      >
        <h1 className="font-bold text-2xl text-secondary">{text} Expense</h1>

        <div className="flex flex-col mt-6">
          <label htmlFor="title">Expense Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={30}
            defaultValue={defaultValues.title}
            className="mt-1 px-3 py-2 border border-tertiary bg-primary focus:border-trasparent focus:outline-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col mt-6">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="0"
              step="0.01"
              required
              defaultValue={defaultValues.amount}
              className="mt-1 px-3 py-2 border border-tertiary bg-primary focus:border-trasparent focus:outline-none"
            />
          </div>

          <div className="flex flex-col mt-4 sm:mt-6">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              max={today}
              required
              defaultValue={
                defaultValues.date ? defaultValues.date.slice(0, 10) : ""
              }
              className="mt-1 px-3 py-2 border border-tertiary bg-primary focus:border-trasparent focus:outline-none date-icon-white"
            />
          </div>
        </div>

        {validationErrors && (
          <ul className="my-2">
            {Object.values(validationErrors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <div className="w-full grid grid-cols-2 sm:flex sm:items-center sm:justify-start mt-2">
          <button
            disabled={isSubmitting}
            className={`sm:w-[100px] text-primary mr-2 my-4 px-3 py-2 font-semibold ${
              isSubmitting ? "bg-amber-300" : "bg-secondary hover:bg-amber-300"
            } transition-colors`}
          >
            {isSubmitting
              ? text === "Add"
                ? "Adding..."
                : "Updating..."
              : text === "Add"
              ? "Add"
              : "Update"}
          </button>

          <Link
            to=".."
            aria-label="Close"
            className="bg-rose-600 sm:w-[100px] text-center hover:bg-rose-500 transition-colors ml-2 my-4 px-3 py-2 font-semibold"
          >
            Close
          </Link>
        </div>
      </Form>
    </div>
  );
}
