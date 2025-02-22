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
    <div className="relative overflow-hidden w-[80%] py-5 bg-white">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
      >
        {/* Duplicate images for seamless looping */}
        {[...images, ...images].map((img, index) => (
          <div key={index} className="w-40 h-40 flex-shrink-0 mr-10">
            <img
              src={img}
              alt={`carousel-${index}`}
              className="w-[90%] h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
