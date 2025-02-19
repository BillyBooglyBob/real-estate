import { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const ImageMoveButtons = ({ handleImageChange }) => {
  return (
    <div
      className={`absolute right-0 bottom-0 h-12 w-20 md:w-56 md:h-20
              flex text-white items-center justify-between`}
    >
      <ImageMoveButton direction="prev" handleClick={handleImageChange} />
      <ImageMoveButton direction="next" handleClick={handleImageChange} />
    </div>
  );
};

export default ImageMoveButtons;

const ImageMoveButton = ({ direction, handleClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`flex-1 h-full bg-[#9d9c9c] hover:bg-white hover:text-[#595959] 
                  transition-all duration-200 ease-in-out flex justify-center items-center
                  ${hover && "opacity-80"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick(direction === "next" ? 1 : -1)}
    >
      {direction === "next" ? (
        <FaArrowRightLong
          className={`"w-1/3 h-1/3 ${
            hover && "translate-x-3"
          } transition-all duration-100 ease-in-out`}
        />
      ) : (
        <FaArrowLeftLong
          className={`"w-1/3 h-1/3 ${
            hover && "-translate-x-3"
          } transition-all duration-100 ease-in-out`}
        />
      )}
    </button>
  );
};
