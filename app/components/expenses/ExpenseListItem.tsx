import { Link, useFetcher } from "@remix-run/react";

// 3rd party
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ExpenseListItemProps {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

function ExpenseListItem({ id, title, amount, date }: ExpenseListItemProps) {
  const fetcher = useFetcher();

  const deleteExpenseItemHandler = () => {
    const proceed = confirm("Are you sure? Do you want to delete this item?");
    if (!proceed) {
      return;
    }
    fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
  };

  const isDeleting = fetcher.state === "submitting";

  return (
    <article className="border border-tertiary flex items-center justify-between mb-4 px-4 py-2 w-full">
      <div>
        <h2 className="text-sm sm:text-base">{title}</h2>
        <div className="flex flex-col sm:flex-row sm:items-end">
          <p className="sm:text-xl mt-2 text-secondary">
            <span className="text-emerald-500 mr-2">$</span>
            <span>{amount.toFixed(2)}</span>
          </p>
          <span className="text-slate-500 text-xs mt-2 sm:mt-0 sm:ml-2">
            {date.toLocaleDateString()}
          </span>
        </div>
      </div>
      <menu className="flex items-center">
        <Link
          to={`/expenses/${id}`}
          aria-label="Edit Expense"
          //prefetch="render"
          className="relative border border-blue-500 text-blue-500 h-10 w-10 hover:text-white hover:bg-blue-500 hover:text-xl transition-all cursor-pointer ml-2 sm:ml-4"
        >
          <FiEdit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </Link>

        <button
          className="relative border border-rose-500 h-10 w-10 text-rose-500 hover:text-white hover:bg-rose-500 hover:text-xl transition-all cursor-pointer ml-2 sm:ml-4"
          onClick={deleteExpenseItemHandler}
        >
          {isDeleting ? (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              ...
            </span>
          ) : (
            <RiDeleteBin6Line className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </button>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
