import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Expense } from "@prisma/client";

// lib
import { getExpenses } from "~/lib/expenses.server";

// components
import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Expenses" },
    { name: "description", content: "Welcome to budgetly!" },
  ];
};

export default function ExpensesPage() {
  const expenses: Expense[] = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet />

      <div className="flex flex-col items-start">
        <ExpensesList expenses={expenses} />
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userID = await requireUserSession(request);

  //console.log("EXPENSES LOADER");
  const expenses: Expense[] = await getExpenses(userID);
  return expenses;
}
