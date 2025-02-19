import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoMdClose,
} from "react-icons/io";
import { useEffect, useState } from "react";

const ImagePopUp = ({
  handleClose,
  listingData,
  imageIndex,
  handleImageChange,
}) => {
  const [mouseMove, setMouseMove] = useState(false);

  // Show the image menu only when the user is moving their mouse
  useEffect(() => {
    // Hide the image menu after 3 seconds of inactivity
    const timeout = setTimeout(() => {
      setMouseMove(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [mouseMove]);

  // Disable scrolling when popup is open
  useEffect(() => {
    // Disable scrolling when popup is open
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when popup is closed
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen z-50`}
      onMouseMove={() => setMouseMove(true)}
    >
      {/* Black overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={(e) => {
          // Prevent closing if the user clicks on a child element (image, buttons)
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      ></div>

      {/* Image Carousel */}
      <div
        className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 
          h-full w-[70%] flex justify-center items-center py-7 overflow-hidden`}
      >
        <div
          className="w-full h-full flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${imageIndex * 100}%)` }}
        >
          {listingData.imageUrls?.map((url, index) => (
            <img
              key={index}
              src={url}
              alt=""
              className={`w-full h-full object-cover flex-shrink-0`}
            />
          ))}
        </div>
      </div>

      {/* Image menu (next/prev, image index, exit) */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          mouseMove ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Next & prev buttons */}
        <ImageNavigation direction="prev" handleClick={handleImageChange} />
        <ImageNavigation direction="next" handleClick={handleImageChange} />

        {/* Image index */}
        <div
          className={`font-noto absolute top-0 left-0 text-lg text-[#ccc] 
            w-24 h-16 flex justify-center items-center`}
        >
          {imageIndex + 1} / {listingData.imageUrls?.length}
        </div>

        {/* Exit button */}
        <button
          className={`absolute top-0 right-0 text-white bg-gray-600  w-12 h-12
            flex justify-center items-center`}
          onClick={handleClose}
          title="Close"
        >
          <IoMdClose className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ImagePopUp;

const ImageNavigation = ({ direction, handleClick }) => {
  return (
    <button
      className={`absolute top-1/2 ${
        direction === "prev" ? "left-4" : "right-10"
      } hover:brightness-125 w-16 h-16
            bg-[#494949] opacity-90 flex justify-center items-center`}
      onClick={() => handleClick(direction === "next" ? 1 : -1)}
      title={direction === "prev" ? "Previous" : "Next"}
    >
      {direction === "prev" ? (
        <IoIosArrowRoundBack className="w-8 h-8 text-[#ccc] " />
      ) : (
        <IoIosArrowRoundForward className="w-8 h-8 text-[#ccc] " />
      )}
    </button>
  );
};
