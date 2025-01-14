import { Link } from "@remix-run/react";
import { useRef, forwardRef, useImperativeHandle } from "react";
import LogoutButton from "../LogoutButton";

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  mainNav?: boolean;
  userID?: string | null;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ isMenuOpen, toggleMenu, mainNav, userID }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => menuRef.current as HTMLDivElement);

    return (
      <div
        className={`${
          isMenuOpen ? "scale-100" : "scale-0"
        } origin-top-right transition duration-300 fixed z-20 top-0 left-0 right-0 bottom-0 bg-[rgba(42,55,75,0.75)]`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 z-30 cursor-pointer p-16"></div>

        <nav
          ref={menuRef}
          className={`absolute z-40 top-8 right-8 ${
            isMenuOpen
              ? "translate-y-0 translate-x-0"
              : "translate-y-32 -translate-x-32"
          } w-[150px] origin-top-left transition duration-700 bg-primary border border-tertiary shadow-[0_8px_8px_#111] p-4 flex flex-col items-center justify-center`}
        >
          {mainNav && (
            <Link
              onClick={toggleMenu}
              to="/expenses"
              className="py-2 hover:bg-tertiary transition-colors w-full text-center mb-4"
            >
              Expenses
            </Link>
          )}

          {!mainNav && (
            <Link
              onClick={toggleMenu}
              to="/analytics"
              className="py-2 hover:bg-tertiary transition-colors w-full text-center mb-4"
            >
              Analytics
            </Link>
          )}

          <Link
            onClick={toggleMenu}
            to="/pricing"
            className="py-2 hover:bg-tertiary transition-colors w-full text-center mb-4"
          >
            Pricing
          </Link>

          {!mainNav ? (
            <LogoutButton toggleMenu={toggleMenu} mainNav={mainNav} />
          ) : userID ? (
            <LogoutButton toggleMenu={toggleMenu} mainNav={mainNav} />
          ) : (
            <Link
              onClick={toggleMenu}
              to="/auth"
              className="py-2 hover:bg-tertiary transition-colors w-full text-center"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    );
  }
);

Menu.displayName = "Menu";
export default Menu;
