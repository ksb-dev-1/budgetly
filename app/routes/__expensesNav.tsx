import { Outlet } from "@remix-run/react";

// components
import ExpensesNav from "~/components/navigation/ExpensesNav";

export default function ExpensesNavLayout() {
  return (
    <>
      <ExpensesNav />
      <Outlet />
    </>
  );
}
