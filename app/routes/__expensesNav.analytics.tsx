import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

// lib
import { getExpenses } from "~/lib/expenses.server";

// components
import ExpensesBarChart from "~/components/expenses/ExpensesBarChart";

// 3rd party
import { Expense } from "@prisma/client";
import { requireUserSession } from "~/lib/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Analytics" },
    { name: "description", content: "Expense analytics" },
  ];
};

export default function ExpensesAnalyticsPage() {
  const expenses: Expense[] = useLoaderData<typeof loader>();

  if (expenses && expenses.length === 0) {
    return (
      <section>
        <h1 className="font-bold text-xl mb-2">No expenses found!</h1>
        <p>
          Go to{" "}
          <Link
            to="/expenses"
            className="text-secondary hover:text-amber-300 transition-colors"
          >
            expenses{" "}
          </Link>
          and try adding some today.
        </p>
      </section>
    );
  }

  return <ExpensesBarChart expenses={expenses} />;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userID = await requireUserSession(request);
  //console.log("EXPENSES LOADER IN ANALYTICS");
  const expenses: Expense[] = await getExpenses(userID);
  return expenses;
}
