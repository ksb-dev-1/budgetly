import { Expense } from "@prisma/client";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect, useMatches, useParams } from "@remix-run/react";

// lib
import { deleteExpense, updateExpense } from "~/lib/expenses.server";

// utils
import { validateExpenseInput } from "~/utils/validation.server";

// components
import ExpenseForm from "~/components/expenses/ExpenseForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Expenses | Update" },
    { name: "description", content: "Edit expense" },
  ];
};

export default function ExpensesEditPage() {
  const params = useParams();
  const matches = useMatches();

  const expenses = matches.find(
    (match) => match.id === "routes/__expensesNav.expenses"
  )?.data as Expense[];

  const expenseData = expenses?.find(
    (expense: Expense) => expense.id === params.id
  );

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(42,55,75,0.75)] flex justify-center">
      <Link
        to=".."
        className="absolute top-0 left-0 right-0 bottom-0 z-30"
      ></Link>
      <div className="absolute z-40 max-w-5xl w-full px-4 sm:px-8 mt-[7rem]">
        <ExpenseForm
          text="Update"
          expenseData={expenseData}
          paramsId={params.id}
          method="PATCH"
        />
      </div>
    </div>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id ?? "";

  // Handle PATCH request (update expense)
  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData) as {
      title: string;
      amount: string; // amount comes as a string from form data
      date: string; // date comes as a string from form data
    };

    try {
      // Validate expense data before updating
      validateExpenseInput(expenseData);
    } catch (error) {
      // If validation fails, return a 400 error or a message
      return { error: "Invalid input data" }; // You can adjust this error handling as needed
    }

    // Proceed with the update if validation is successful
    await updateExpense(expenseId, expenseData);
    return redirect("/expenses"); // Redirect after updating
  }
  // Handle DELETE request (delete expense)
  else if (request.method === "DELETE") {
    await deleteExpense(expenseId); // Delete the expense by ID

    return { deletedId: expenseId };
    // Optionally redirect after deletion
    //return redirect("/expenses"); // Redirect to the expenses list after deletion
  }

  // Return null if the method is neither PATCH nor DELETE
  return null;
}
