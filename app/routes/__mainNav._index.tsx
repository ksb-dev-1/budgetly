import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

// 3rd party
import { IoIosArrowRoundForward } from "react-icons/io";

export const meta: MetaFunction = () => {
  return [
    { title: "Budgetly - Mange your expenses" },
    { name: "description", content: "Welcome to budgetly!" },
  ];
};

export default function Index() {
  return (
    <main>
      <section>
        <div className="flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="relative h-[300px] sm:h-[500px] w-full lg:w-[500px] border border-tertiary">
            <img
              src="expense-management.svg"
              alt="A list of expenses."
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150px] sm:h-[300px]"
            />
          </div>
          <div className="mt-8 lg:mt-0 flex flex-col items-center lg:items-start">
            <p className="font-semibold sm:text-xl text-center lg:text-start">
              Manage your <span className="text-secondary">expenses</span> in
              one central place.
            </p>
            <p>
              <Link
                className="mt-4 flex items-center bg-secondary hover:bg-amber-300 transition-colors px-4 py-2 w-fit text-primary"
                to="/expenses"
              >
                <span className="mr-2 font-semibold">Get Started</span>
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div className="border-b border-tertiary my-16"></div>
      <section>
        <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-between">
          <div className="relative h-[300px] sm:h-[500px] w-full lg:w-[500px] border border-tertiary">
            <img
              src="analytics-1.svg"
              alt="A list of expenses."
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150px] sm:h-[250px]"
            />
          </div>
          <div className="mt-8 lg:mt-0 max-w-[500px] w-full flex flex-col items-center lg:items-start">
            <p className="font-semibold sm:text-xl text-center lg:text-start">
              Benefit from the{" "}
              <span className="text-secondary">analytics </span>
              feature that provides spending insights with the premium plan.
            </p>
            <p>
              <Link
                className="mt-4 flex items-center bg-secondary hover:bg-amber-300 transition-colors px-4 py-2 w-fit text-primary"
                to="/pricing"
                aria-label="Pricing"
              >
                <span className="mr-2 font-semibold">Go to pricing</span>
                <IoIosArrowRoundForward className="text-2xl" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const handle = { disableJS: true };
