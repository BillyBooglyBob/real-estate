import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 0;

const ScrollRevealText = ({ imgUrl, content }) => {
  return (
    <div className="relative h-[100vh]">
      {imgUrl && <StickyImage imgUrl={imgUrl} />}
      <OverlayCopy content={content} />
    </div>
  );
};

export default ScrollRevealText;

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-b-3xl h-screen"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/60"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ content }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      {content}
    </motion.div>
  );
};
