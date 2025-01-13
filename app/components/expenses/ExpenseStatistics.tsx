import { Expense } from "@prisma/client";
import { useMemo } from "react";

interface ChartProps {
  expenses: Expense[];
}

function calculateSummaryStatistics(expenses: ChartProps["expenses"]) {
  const amounts = expenses.map((expense) => +expense.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0);
  const mean = sum / expenses.length;

  return { minAmount, maxAmount, sum, mean };
}

function ExpenseStatistics({ expenses }: { expenses: Expense[] }) {
  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(expenses),
    [expenses]
  );

  return (
    <section className="mt-8">
      <h2 className="font-semibold text-xl sm:text-2xl text-secondary">
        Expense Statistics
      </h2>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-primary">
        <div className="bg-secondary p-4">
          <dt className="font-bold">Total</dt>
          <dd>${sum.toFixed(2)}</dd>
        </div>
        <div className="bg-secondary p-4">
          <dt className="font-bold">Average</dt>
          <dd>${mean.toFixed(2)}</dd>
        </div>
        <div className="bg-secondary p-4">
          <dt className="font-bold"> Min. Amount</dt>
          <dd>${minAmount.toFixed(2)}</dd>
        </div>
        <div className="bg-secondary p-4">
          <dt className="font-bold">Max. Amount</dt>
          <dd>${maxAmount.toFixed(2)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ExpenseStatistics;
