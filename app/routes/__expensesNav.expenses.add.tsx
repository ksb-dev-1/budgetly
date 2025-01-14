import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react";

// lib
import { addExpense } from "~/lib/expenses.server";
import { requireUserSession } from "~/lib/auth.server";

// utils
import { validateExpenseInput } from "~/utils/validation.server";

// components
import ExpenseForm from "~/components/expenses/ExpenseForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Expenses | Add" },
    { name: "description", content: "Add expense" },
  ];
};

export default function ExpensesAddPage() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(42,55,75,0.75)] flex justify-center">
      <Link
        to=".."
        className="absolute top-0 left-0 right-0 bottom-0 z-30"
      ></Link>
      <div className="absolute z-40 max-w-5xl w-full px-4 sm:px-8 mt-[7rem]">
        <ExpenseForm text="Add" />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const userID = await requireUserSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData) as {
    title: string;
    amount: string; // amount comes as a string from form data
    date: string; // date comes as a string from form data
  };

  let validatedExpenseData;

  try {
    validatedExpenseData = validateExpenseInput(expenseData);
  } catch (error) {
    console.log(error);
    return error;
  }

  await addExpense(validatedExpenseData, userID);

  return redirect("/expenses");
}
