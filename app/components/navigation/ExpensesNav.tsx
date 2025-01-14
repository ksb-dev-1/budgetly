import { Form, NavLink } from "@remix-run/react";

export default function ExpensesNav() {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-center h-[4.5rem] backdrop-blur-xl border-b border-tertiary z-10">
      <nav className="max-w-5xl w-full px-8 flex items-center justify-between">
        <NavLink
          to="/"
          className="font-extrabold text-2xl text-secondary hover:text-amber-300 transition-all"
        >
          Budgetly
        </NavLink>

        <div className="hidden sm:flex items-center">
          <NavLink
            to="/expenses"
            //end
            //prefetch="render"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-[3px] border-secondary text-secondary"
                  : "border-b-[3px] border-transparent"
              } flex items-center h-[4.5rem] ml-8 hover:text-secondary transition-colors`
            }
          >
            Expenses
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-[3px] border-secondary text-secondary"
                  : "border-b-[3px] border-transparent"
              } flex items-center h-[4.5rem] ml-8 hover:text-secondary transition-colors`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `${
                isActive
                  ? "border-b-[3px] border-secondary text-secondary"
                  : "border-b-[3px] border-transparent"
              } flex items-center h-[4.5rem] ml-8 hover:text-secondary transition-colors`
            }
          >
            Pricing
          </NavLink>
        </div>

        <Form method="post" action="logout">
          <button className="font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors">
            Logout
          </button>
        </Form>
      </nav>
    </header>
  );
}
