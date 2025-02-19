import { useState } from "react";
import { IoIosCheckbox } from "react-icons/io";
import { motion } from "framer-motion";

const SearchFilter = ({ handleChange, options, value }) => {
  /**
   * Clickable button
   * Absolutely positioned values
   */
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={() => setIsHidden((prev) => !prev)}
        className={`px-5 w-56 h-full border border-black rounded-sm transition-all duration-150 ease-in-out ${
          isHidden
            ? "bg-white hover:bg-black hover:text-white"
            : "bg-black text-white "
        }`}
      >
        {value}
      </button>
      <div
        className={`absolute bg-white flex flex-col gap-2 w-60 shadow-md rounded-b-xl p-3 mt-2 z-40
            transform transition-all duration-100 origin-top ${
              isHidden
                ? "opacity-0 scale-y-0 pointer-events-none"
                : "opacity-100 scale-y-100"
            }`}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleChange(option.value)}
            className={`h-11 px-4 flex justify-between items-center p-2 ${
              option.text === value && "bg-gray-100"
            } hover:bg-gray-100 transition-all rounded-md duration-100 z-40`}
          >
            {option.text}
            {option.text === value && <IoIosCheckbox />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
