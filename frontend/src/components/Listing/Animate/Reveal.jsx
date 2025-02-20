import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gray-300 z-10"
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        
      ></motion.div>
    </div>
  );
};

export default Reveal;
