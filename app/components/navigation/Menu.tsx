import { Link } from "@remix-run/react";
import { useRef, forwardRef, useImperativeHandle } from "react";
import LogoutButton from "../LogoutButton";

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  pricing?: boolean;
  userID?: string | null;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ isMenuOpen, toggleMenu, pricing, userID }, ref) => {
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
          } origin-top-left transition duration-700 bg-primary border border-tertiary shadow-[0_8px_16px_#000] p-8 flex flex-col items-center justify-center`}
        >
          <Link
            onClick={toggleMenu}
            to="/expenses"
            className="hover:text-secondary transition-colors"
          >
            Expenses
          </Link>
          {pricing ? (
            <Link
              onClick={toggleMenu}
              to="/pricing"
              className="hover:text-secondary transition-colors my-8"
            >
              Pricing
            </Link>
          ) : (
            <Link
              onClick={toggleMenu}
              to="/analytics"
              className="hover:text-secondary transition-colors my-8"
            >
              Analytics
            </Link>
          )}

          {userID ? (
            <LogoutButton toggleMenu={toggleMenu} pricing={pricing} />
          ) : (
            <Link
              onClick={toggleMenu}
              to="/auth"
              className="hover:text-secondary transition-colors"
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
