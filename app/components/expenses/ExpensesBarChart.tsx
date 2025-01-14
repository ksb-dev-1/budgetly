import { useState } from "react";

// components
import YearsDropdown from "~/components/expenses/YearsDropdown";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

// 3rd party
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "@prisma/client";

const groupExpensesByMonth = (expenses: Expense[], selectedYear: number) => {
  const grouped: Record<
    string,
    { month: string; total: number; monthIndex: number }
  > = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "short" }); // Short month name
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // Zero-based month index

    if (year === selectedYear) {
      const monthKey = `${month} ${year}`; // Combine month and year
      if (!grouped[monthKey]) {
        grouped[monthKey] = { month: month, total: 0, monthIndex };
      }
      grouped[monthKey].total += expense.amount;
    }
  });

  return Object.values(grouped).sort((a, b) => a.monthIndex - b.monthIndex);
};

export default function ExpensesBarChart({
  expenses,
}: {
  expenses: Expense[];
}) {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
    //2024
  ); // Default to current year

  const years = Array.from(
    new Set(expenses.map((expense) => new Date(expense.date).getFullYear()))
  ).sort(); // Unique sorted years

  // Filter data by selected year
  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getFullYear() === selectedYear
  );

  const chartData = groupExpensesByMonth(expenses, selectedYear); // Filter data by selected year

  return (
    <>
      <div className="w-full border border-tertiary pt-8 pb-4 sm:pt-12 sm:pb-8">
        <div className="flex justify-end">
          <YearsDropdown
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              interval={0} // Show all ticks for small datasets
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              // formatter={(value: number) => [
              //   `$${value.toFixed(2)}`,
              //   "Total Expense",
              // ]}
              content={<CustomTooltip />}
            />
            <Bar dataKey="total" fill="#ffac1c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ExpenseStatistics expenses={filteredExpenses} />
    </>
  );
}

interface TooltipPayload {
  value: number;
  name: string;
  dataKey: string;
  payload: Record<string, unknown>;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-primary px-4 py-2 shadow-[0_5px_15px_#000]">
        <p>Total Expense</p>
        <p className="font-bold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};
