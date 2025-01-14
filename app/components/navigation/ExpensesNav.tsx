import { useState, useRef, useEffect } from "react";
import { Form, Link, NavLink } from "@remix-run/react";
import { GrMenu } from "react-icons/gr";
import { useHandleOutsideClick } from "~/hooks/useHandleOutsideClick";

export default function ExpensesNav() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const menuBtnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null);

  useHandleOutsideClick(menuRef, setIsMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Optional: Check on mount in case the component mounts with a larger screen
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-center h-[4.5rem] backdrop-blur-xl border-b border-tertiary z-10">
        <nav className="max-w-5xl w-full px-4 sm:px-8 flex items-center justify-between">
          <NavLink
            to="/"
            className="font-extrabold text-2xl text-secondary hover:text-amber-300 transition-all"
          >
            Budgetly
          </NavLink>

          <button
            onClick={openMenu}
            className="flex sm:hidden text-2xl hover:text-secondary transition-colors"
          >
            <GrMenu />
          </button>

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
          </div>
          <Form method="post" action="logout" className="hidden sm:flex">
            <button className="font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors">
              Logout
            </button>
          </Form>
        </nav>
      </header>

      <div
        className={`${
          isMenuOpen ? "scale-100" : "scale-0"
        } origin-top-right transition duration-300 fixed z-20 top-0 left-0 right-0 bottom-0 bg-[rgba(42,55,75,0.75)]`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 z-30 cursor-pointer p-16"></div>

        <nav
          ref={menuRef}
          className={`absolute z-40 top-4 right-4 ${
            isMenuOpen
              ? "translate-y-0 translate-x-0"
              : "translate-y-32 -translate-x-32"
          } origin-top-left transition duration-700 bg-primary border border-tertiary shadow-[0_8px_16px_#000] p-8 flex flex-col items-center justify-center`}
        >
          <Link
            onClick={closeMenu}
            to="/expenses"
            className="hover:text-secondary transition-colors"
          >
            Expenses
          </Link>
          <Link
            onClick={closeMenu}
            to="/analytics"
            className="hover:text-secondary transition-colors my-8"
          >
            Analytics
          </Link>
          <Form method="post" action="logout" onClick={closeMenu}>
            <button className="font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors">
              Logout
            </button>
          </Form>
        </nav>
      </div>
    </>
  );
}
