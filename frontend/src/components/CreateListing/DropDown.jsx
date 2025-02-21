import { useState } from "react";
import { motion } from "framer-motion";

const DropDown = ({ options, handleChange, value }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative w-full h-full p-2 flex justify-center items-center
      border border-gray-400 rounded-sm hover:border-black transition-all duration-150 ease-in-out`}
    >
      <button type="button" onClick={() => setOpen(!open)}>
        {value}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-10 shadow-md flex flex-col w-full bg-[#faf9f2] "
        >
          {options.map(({ value, description }, index) => (
            <button
              key={index}
              type="button"
              value={value}
              onClick={(e) => {
                handleChange((prev) => ({ ...prev, type: e.target.value }));
                setOpen(false);
              }}
              className="w-full p-2 hover:bg-black hover:text-white duration-300 transition-all ease-in-"
            >
              {description}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DropDown;
