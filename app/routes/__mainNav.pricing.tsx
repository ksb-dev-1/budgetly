import { MetaFunction } from "@remix-run/node";

// components
import PricingPlan from "~/components/marketing/PricingPlan";

// 3rd party
import { FaHandshake } from "react-icons/fa";
import { BiSolidBadgeDollar } from "react-icons/bi";

export const meta: MetaFunction = () => {
  return [
    { title: "Pricing" },
    { name: "description", content: "Pricing details" },
  ];
};

const PRICING_PLANS = [
  {
    id: "p1",
    title: "Starter",
    price: "Free forever",
    perks: ["Up to 1000 expenses / year", "No analytics"],
    icon: FaHandshake,
  },
  {
    id: "p3",
    title: "Advenced",
    price: "$9.99/month",
    perks: ["Unlimited expenses / year", "Detailed analytics"],
    icon: BiSolidBadgeDollar,
  },
];

export default function PricingPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-xl sm:text-2xl text-center">
        Choose a Plan, Unlock Your Potential.
      </h2>
      <ol
        className="w-full grid sm:grid-cols-2 gap-8 mt-8 sm:mt-16"
        //className="w-full grid sm:w-fit sm:flex sm:items-center sm:gap-8 sm:mt-8"
      >
        {PRICING_PLANS.map((plan) => (
          <li key={plan.id} className="plan">
            <PricingPlan
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </main>
  );
}

export const handle = { disableJS: true };
