// import ChartBar from './ChartBar';

// function Chart({ expenses }: any) {
//   const chartDataPoints = [
//     { label: 'Jan', value: 0 },
//     { label: 'Feb', value: 0 },
//     { label: 'Mar', value: 0 },
//     { label: 'Apr', value: 0 },
//     { label: 'May', value: 0 },
//     { label: 'Jun', value: 0 },
//     { label: 'Jul', value: 0 },
//     { label: 'Aug', value: 0 },
//     { label: 'Sep', value: 0 },
//     { label: 'Oct', value: 0 },
//     { label: 'Nov', value: 0 },
//     { label: 'Dec', value: 0 },
//   ];

//   for (const expense of expenses) {
//     const expenseMonth = new Date(expense.date).getMonth(); // starting at 0 => January => 0
//     chartDataPoints[expenseMonth].value += expense.amount;
//   }

//   const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
//   const totalMaximum = Math.max(...dataPointValues);

//   return (
//     <section>
//       <h2>Monthly Expenses</h2>
//       <ol className='chart'>
//         {chartDataPoints.map((dataPoint) => (
//           <ChartBar
//             key={dataPoint.label}
//             value={dataPoint.value}
//             maxValue={totalMaximum}
//             label={dataPoint.label}
//           />
//         ))}
//       </ol>
//     </section>
//   );
// }

// export default Chart;

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpenseProps {
  id: string;
  title: string;
  amount: number;
  date: string; // ISO string format
}

interface ChartProps {
  expenses: ExpenseProps[];
}

// Helper to group expenses by month
const groupExpensesByMonth = (expenses: ExpenseProps[]) => {
  const grouped: Record<
    string,
    { month: string; total: number; monthIndex: number }
  > = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("default", { month: "long" }); // Get month name
    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // Get zero-based month index
    const monthKey = `${month} ${year}`;

    if (!grouped[monthKey]) {
      grouped[monthKey] = { month: monthKey, total: 0, monthIndex };
    }
    grouped[monthKey].total += expense.amount;
  });

  return Object.values(grouped).sort((a, b) => a.monthIndex - b.monthIndex);
};

// Helper to group expenses by 7-day ranges, starting from Sunday to Saturday
const groupExpensesByWeek = (expenses: ExpenseProps[]) => {
  const grouped: Record<
    string,
    { range: string; total: number; weekStart: Date }
  > = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);

    // Calculate the start of the week (Sunday)
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Adjust to the previous Sunday

    // Calculate the end of the week (Saturday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Add 6 days to get Saturday

    // Format the range as "Jan 1 - Jan 7"
    const range = `${weekStart.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    })} - ${weekEnd.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    })}`;

    if (!grouped[range]) {
      grouped[range] = { range, total: 0, weekStart };
    }
    grouped[range].total += expense.amount;
  });

  // Sort by the starting date of each week to ensure weeks are in order
  return Object.values(grouped).sort(
    (a, b) => a.weekStart.getTime() - b.weekStart.getTime()
  );
};

const Chart: React.FC<ChartProps> = ({ expenses }) => {
  const [viewMode, setViewMode] = useState<"monthly" | "weekly">("monthly");

  // Toggle grouping based on view mode
  const chartData =
    viewMode === "monthly"
      ? groupExpensesByMonth(expenses)
      : groupExpensesByWeek(expenses);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setViewMode("monthly")}>Monthly</button>
        <button onClick={() => setViewMode("weekly")}>Weekly</button>
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
          <XAxis dataKey={viewMode === "monthly" ? "month" : "range"} />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              `$${value.toFixed(2)}`,
              "Total Expense",
            ]}
          />
          <Bar dataKey="total" fill="#B3CDAD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
