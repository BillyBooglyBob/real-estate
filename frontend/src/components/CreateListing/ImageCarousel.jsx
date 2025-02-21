import { useState } from "react";
import FullScreenGallery from "../Gallery/FullScreenGallery";
import { motion } from "framer-motion";

const ImageCarousel = ({ images, handleClick }) => {
  /**
   * Images, hover can enlarge
   * Click, shows carousel and can delete
   */
  const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % images.length;
    setImageIndex(newIndex >= 0 ? newIndex : images.length - 1);
  };

  return (
    <div>
      {showFullScreenGallery && (
        <FullScreenGallery
          handleClose={() => setShowFullScreenGallery(false)}
          images={images}
          imageIndex={imageIndex}
          handleImageChange={handleImageChange}
          handleDeleteImage={() => handleClick(imageIndex)}
        />
      )}
      {images.map((url, index) => (
        <div
          key={url}
          onClick={() => {
            setImageIndex(index);
            setShowFullScreenGallery(true);
          }}
          className="flex justify-between border p-3 cursor-pointer"
        >
          <div className="w-36 h-36 overflow-hidden">
            <motion.img
              src={url}
              alt="listing image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={() => handleClick(index)}
            className="text-red-700 uppercase hover:opacity-75"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
