import { Link } from "@remix-run/react";

// 3rd party
import { IconType } from "react-icons";
import { IoIosArrowRoundForward } from "react-icons/io";

interface PricingPlanProps {
  title: string;
  price: string;
  perks: string[];
  icon: IconType;
}

function PricingPlan({ title, price, perks, icon }: PricingPlanProps) {
  const Icon = icon;

  return (
    <article>
      <header
        className={`${
          title === "Starter" ? "bg-white" : "bg-secondary"
        } text-primary flex flex-col items-center p-8`}
      >
        <div className="relative h-20 w-20 rounded-full border-2 border-primary">
          <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl" />
        </div>
        <h2 className="mt-4 font-extrabold text-xl mb-2">{title}</h2>
        <p className="font-medium">{price}</p>
      </header>
      <div className="bg-tertiary flex flex-col items-center p-8">
        <ol className="flex flex-col items-center">
          {perks.map((perk) => (
            <li key={perk} className="mb-2">
              {perk}
            </li>
          ))}
        </ol>
        <div className="actions">
          <Link
            to="#"
            className="px-8 py-4 bg-primary mt-4 hover:bg-[#000] transition-colors flex items-center font-semibold"
          >
            <span className="mr-2">Learn more</span>
            <IoIosArrowRoundForward className="text-2xl" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PricingPlan;
