import { motion } from "framer-motion";
import { useState } from "react";
import { formatPrice } from "../../util/util";

const Input = ({
  handleChange,
  inputType,
  placeholder,
  inputFieldType,
  inputField,
}) => {
  const [focused, setFocused] = useState(false);

  if (inputType === "textarea") {
    return (
      <div className="relative w-full h-full group">
        <textarea
          className={style}
          value={inputField}
          onChange={(e) =>
            handleChange((prev) => ({
              ...prev,
              [inputFieldType]: e.target.value,
            }))
          }
          // placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <motion.div
          initial={{ y: 0 }}
          animate={
            inputField || focused ? { y: -20, scale: 0.8 } : { y: 0, scale: 1 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="origin-top-left absolute top-2 left-2 text-[#595959] bg-[#faf9f2] px-2 pointer-events-none"
        >
          {placeholder}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <input
        type={inputType === "number" ? "number" : "text"}
        className={style}
        value={!inputField ? "" :
          inputFieldType === "price"
            ? focused
              ? inputField
              : formatPrice(inputField)
            : inputField
        }
        placeholder=""
        onChange={
          inputFieldType === "address" || inputFieldType === "price"
            ? (e) =>
                handleChange((prev) => ({
                  ...prev,
                  [inputFieldType]: e.target.value,
                }))
            : (e) =>
                handleChange((prev) => ({
                  ...prev,
                  specifications: {
                    ...prev.specifications,
                    [inputFieldType]: e.target.value,
                  },
                }))
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={
          inputField || focused ? { y: -20, scale: 0.8 } : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="origin-top-left absolute top-2 left-2 text-[#595959] bg-[#faf9f2] px-2 pointer-events-none"
      >
        {placeholder}
      </motion.div>
    </div>
  );
};

export default Input;

const style = `border border-gray-400 w-full rounded-sm p-2 pl-3 transition-all duration-150 ease-in-out 
                 hover:border-black focus:border-black group-focus:border-black bg-[#faf9f2]`;
