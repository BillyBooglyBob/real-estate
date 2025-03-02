import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

const ScrollFadeSides = ({ imgUrl, content }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative h-screen bg-white flex mt-20 gap-20 overflow-hidden"
    >
      <LeftContent content={content} mainControls={mainControls} />
      <RightImage imgUrl={imgUrl} mainControls={mainControls} />
    </div>
  );
};

const RightImage = ({ imgUrl, mainControls }) => {
  return (
    <motion.div
      variants={rightImageVariants}
      initial="hidden"
      transition={transition}
      animate={mainControls}
      className="h-full w-full relative"
    >
      <div className="absolute top-0 right-0 w-[70%] h-[40%] bg-black"></div>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="z-[5] absolute top-[20%] right-[40%] h-[80%] w-[50%]"
      ></div>
    </motion.div>
  );
};

const LeftContent = ({ content, mainControls }) => {
  return (
    <motion.div
      variants={leftContentVariants}
      initial="hidden"
      transition={transition}
      animate={mainControls}
      className="w-full pl-20"
    >
      {content}
    </motion.div>
  );
};

export default ScrollFadeSides;

const transition = {
  duration: 1,
  delay: 0.5,
};

const leftContentVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const rightImageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};
