import { motion } from "framer-motion";

import img1 from "../../assets/images/home page image carousel/1.png";
import img2 from "../../assets/images/home page image carousel/2.png";
import img3 from "../../assets/images/home page image carousel/3.png";
import img4 from "../../assets/images/home page image carousel/4.png";
import img5 from "../../assets/images/home page image carousel/5.png";
import img6 from "../../assets/images/home page image carousel/6.png";

const images = [img1, img2, img3, img4, img5, img6];

const InfiniteCarousel = () => {
  return (
    <div className="relative w-[80%] overflow-hidden">
      <motion.div
        className="flex w-[200%]"
        animate={{ x: [0, "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: images.length * 20,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`carousel-${index}`}
            className="w-60 h-auto object-cover mx-16"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
