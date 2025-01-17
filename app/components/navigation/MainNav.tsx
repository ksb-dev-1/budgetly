import { Form, NavLink, useLoaderData } from "@remix-run/react";

export default function MainNav() {
  const userID = useLoaderData<string | null>();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-center h-[4.5rem] backdrop-blur-3xl border-b border-tertiary z-10">
        <nav className="max-w-5xl w-full px-8 flex items-center justify-between">
          <NavLink
            to="/"
            className="font-extrabold text-2xl text-secondary hover:text-amber-300 transition-all"
          >
            Budgetly
          </NavLink>

          <div className="hidden sm:flex w-fit items-center justify-between">
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-[3px] border-secondary text-secondary"
                    : "border-b-[3px] border-transparent"
                } flex items-center h-[4.5rem] mx-4 hover:text-secondary transition-colors`
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
                } flex items-center h-[4.5rem] mx-4 hover:text-secondary transition-colors`
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
                } flex items-center h-[4.5rem] mx-4 hover:text-secondary transition-colors`
              }
            >
              Pricing
            </NavLink>
          </div>

          {userID ? (
            <Form method="post" action="/logout">
              <button className="font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors sm:ml-8">
                Logout
              </button>
            </Form>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-[3px] border-secondary text-secondary"
                    : "border-b-[3px] border-transparent"
                } flex items-center h-[4.5rem] hover:text-secondary transition-colors ml-8`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
    </>
  );
}
