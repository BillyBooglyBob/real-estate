import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";

export const DropDown = ({ name, links }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <motion.div
      animate={showDropDown ? "open" : "closed"}
      className="relative"
      onMouseEnter={() => setShowDropDown(true)} // Hover logic on parent
      onMouseLeave={() => setShowDropDown(false)} // Hover logic on parent
    >
      {/* Button */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2">
        <span className="font-medium text-md">{name}</span>
        <motion.span variants={iconVariants}>
          <FaChevronDown />
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <motion.ul
        initial="closed"
        animate={showDropDown ? "open" : "closed"}
        variants={wrapperVariants}
        style={{ originY: "top" }}
        className="absolute left-0 p-2 bg-white shadow-lg border border-gray-200 flex flex-col rounded-md overflow-hidden min-w-[150px]"
      >
        {links.map((link) => (
          <motion.li
            key={link.name}
            variants={itemVariants}
            className="flex items-center justify-center font-medium text-sm"
            onClick={link.onClick ? () => link.onClick() : undefined}
          >
            <Link
              to={link.link}
              className="text-black flex items-center w-full h-14 px-4 py-2 hover:bg-gray-200 transition-colors duration-200"
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default DropDown;

// Animation Variants
const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      ease: "easeOut",
      duration: 0.2,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.01,
      ease: "easeOut",
      duration: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180, transition: { duration: 0.2 } },
  closed: { rotate: 0, transition: { duration: 0.1 } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};
