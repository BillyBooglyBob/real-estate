import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { CiStar } from "react-icons/ci";

const ScrollSequentialReveal = ({ headings }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={mainControls}
      className="flex flex-col md:flex-row justify-center items-center gap-10 my-32"
    >
      {headings.map((heading, index) => (
        <motion.div
          variants={itemVariants}
          key={index}
          className="h-60 w-80 flex flex-col justify-center items-center gap-5
          bg-[#E2E0D9]"
        >
          <CiStar className="text-6xl text-orange-600" />
          <h1 className="text-5xl font-tenor">{heading.value}</h1>
          <h2 className="text-2xl font-noto">{heading.title}</h2>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ScrollSequentialReveal;

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
