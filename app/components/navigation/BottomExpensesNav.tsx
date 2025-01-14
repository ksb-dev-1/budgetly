import { NavLink } from "@remix-run/react";

import { AiFillHome } from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { RiMedalFill } from "react-icons/ri";

export default function BottomExpensesNav() {
  return (
    <header className="sm:hidden fixed bottom-0 left-0 right-0 flex items-center justify-center h-[4.5rem] border-t border-tertiary bg-[rgba(11,17,32,0.95)] z-10">
      <nav className="max-w-5xl w-full px-8 flex items-center justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative h-10 w-10 rounded-full  ${
              isActive ? "bg-secondary text-primary" : "bg-tertiary text-white"
            } mr-4 hover:rounded-none transition-all`
          }
        >
          <AiFillHome className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `relative h-10 w-10 rounded-full  ${
              isActive ? "bg-secondary text-primary" : "bg-tertiary text-white"
            } mr-4 hover:rounded-none transition-all`
          }
        >
          <MdOutlineAttachMoney className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `relative h-10 w-10 rounded-full  ${
              isActive ? "bg-secondary text-primary" : "bg-tertiary text-white"
            } mr-4 hover:rounded-none transition-all`
          }
        >
          <SiSimpleanalytics className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </NavLink>

        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `relative h-10 w-10 rounded-full  ${
              isActive ? "bg-secondary text-primary" : "bg-tertiary text-white"
            } mr-4 hover:rounded-none transition-all`
          }
        >
          <RiMedalFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </NavLink>
      </nav>
    </header>
  );
}
