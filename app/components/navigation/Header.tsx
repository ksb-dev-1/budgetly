import { NavLink, Form } from "@remix-run/react";
import { useState } from "react";
import { GrClose, GrMenu } from "react-icons/gr";

export default function Header({ userID }: { userID: string | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  console.log(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-center h-[4.5rem] backdrop-blur-xl border-b border-tertiary z-10">
        <nav className="max-w-5xl w-full px-8 flex items-center justify-between">
          <NavLink
            to="/"
            className="font-extrabold text-2xl text-secondary hover:text-amber-300 transition-all"
          >
            Budgetly
          </NavLink>

          <button
            onClick={toggleMenu}
            className="flex sm:hidden text-2xl hover:text-secondary transition-colors"
          >
            {isMenuOpen ? <GrClose /> : <GrMenu />}
          </button>

          <div className="hidden sm:flex w-fit items-center justify-between">
            {userID && (
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-[3px] border-secondary text-secondary"
                      : "border-b-[3px] border-transparent"
                  } flex items-center h-[4.5rem] sm:ml-8 hover:text-secondary transition-colors`
                }
              >
                Expenses
              </NavLink>
            )}

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-[3px] border-secondary text-secondary"
                    : "border-b-[3px] border-transparent"
                } flex items-center h-[4.5rem] sm:ml-8 hover:text-secondary transition-colors`
              }
            >
              Pricing
            </NavLink>

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
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed z-20 top-0 left-0 w-full h-full bg-white">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-2xl">
              <GrClose />
            </button>
          </div>
          <div className="p-8">
            <NavLink to="/" className="block mb-4" onClick={toggleMenu}>
              Home
            </NavLink>
            {userID && (
              <NavLink
                to="/expenses"
                className="block mb-4"
                onClick={toggleMenu}
              >
                Expenses
              </NavLink>
            )}
            <NavLink to="/pricing" className="block mb-4" onClick={toggleMenu}>
              Pricing
            </NavLink>
            {userID ? (
              <Form method="post" action="/logout">
                <button className="block mb-4">Logout</button>
              </Form>
            ) : (
              <NavLink to="/auth" className="block" onClick={toggleMenu}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
}
