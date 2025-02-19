import { FaImage } from "react-icons/fa6";
import { useState } from "react";

const ImageCountButton = ({ imageCount, handleClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`absolute left-0 bottom-0 md:w-20 md:h-16 w-20 h-12 bg-white
              flex items-center justify-evenly text-[#595959]`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <FaImage
        className={`${
          hover && "scale-125"
        } scale-105 transition-all duration-300 ease-in-out`}
      />
      {imageCount}
    </button>
  );
};

export default ImageCountButton;
