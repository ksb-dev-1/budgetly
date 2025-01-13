import { Link } from "@remix-run/react";

// components
import ExpenseListItem from "./ExpenseListItem";

// 3rd party
import { FaPlus } from "react-icons/fa6";
import { Expense } from "@prisma/client";

function ExpensesList({ expenses }: { expenses: Expense[] }) {
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      {hasExpenses && (
        <Link
          to="/expenses/add"
          className="mb-4 w-full sm:w-fit flex items-center justify-center sm:justify-start bg-secondary text-primary px-4 py-2 font-semibold hover:bg-amber-300 transition-colors"
        >
          <FaPlus className="inline-block mr-2" />
          <span>Add Expense</span>
        </Link>
      )}

      {!hasExpenses && (
        <section>
          <h1 className="font-bold text-xl mb-2">No expenses found!</h1>
          <p>
            Start{" "}
            <Link
              to="/expenses/add"
              className="text-secondary hover:text-amber-300 transition-colors"
            >
              adding{" "}
            </Link>
            some today.
          </p>
        </section>
      )}

      <ol className="inline-block w-full">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <ExpenseListItem
              id={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          </li>
        ))}
      </ol>
    </>
  );
}

export default ExpensesList;
