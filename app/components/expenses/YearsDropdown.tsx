import { useState, useRef } from "react";

// hooks
import { useHandleOutsideClick } from "~/hooks/useHandleOutsideClick";

// 3rd party
import { GoChevronDown } from "react-icons/go";

interface YearsDropdownProps {
  years: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export default function YearsDropdown({
  years,
  selectedYear,
  setSelectedYear,
}: YearsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(dropdownRef, setIsDropdownOpen);

  return (
    <div className="mr-8 mb-8 relative">
      {years.length > 1 ? (
        <div ref={dropdownRef} className="relative">
          <div className="flex items-center">
            <span className="mr-2">Year</span>
            <button
              className="px-4 py-2 bg-tertiary w-[100px] cursor-pointer flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-controls="years-dropdown"
            >
              {selectedYear}
              <GoChevronDown />
            </button>
          </div>

          {/* Dropdown */}
          <ul
            id="years-dropdown"
            className={`absolute right-0 w-[100px] bg-tertiary z-10 shadow-xl mt-1 origin-top-right transition ${
              isDropdownOpen ? "scale-1" : "scale-0"
            }`}
          >
            {years.map((year) => (
              <li key={year}>
                <button
                  onClick={() => {
                    setSelectedYear(year);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-4 py-2 text-left w-full hover:bg-white hover:text-primary`}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="px-4 p-2 w-fit bg-blue-500 text-white">
          {years[0]}
        </span>
      )}
    </div>
  );
}
