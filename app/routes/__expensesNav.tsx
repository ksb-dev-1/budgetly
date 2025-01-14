import { Outlet } from "@remix-run/react";

//components
import ExpensesNav from "~/components/navigation/ExpensesNav";
import BottomExpensesNav from "~/components/navigation/BottomExpensesNav";

export default function ExpensesNavLayout() {
  return (
    <>
      <ExpensesNav />
      <BottomExpensesNav />
      <Outlet />
    </>
  );
}
