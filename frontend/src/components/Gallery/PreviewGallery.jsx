import FullScreenGallery from "./FullScreenGallery";
import ImageCountButton from "../Listing/Button/ImageCountButton";
import ImageMoveButtons from "../Listing/Button/ImageMoveButtons";
import { useState } from "react";

const PreviewGallery = ({ images, handleDeleteImage }) => {
  // keep track of which image to currently display
  const [imageIndex, setImageIndex] = useState(0);

  // keep track of whether to show the full screen gallery
  const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);

  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % images.length;
    setImageIndex(newIndex >= 0 ? newIndex : images.length - 1);
  };

  return (
    <div className="relative">
      {showFullScreenGallery && (
        <FullScreenGallery
          handleClose={() => setShowFullScreenGallery(false)}
          handleImageChange={handleImageChange}
          images={images}
          imageIndex={imageIndex}
          handleDeleteImage={handleDeleteImage}
        />
      )}
      <div className="relative overflow-hidden w-full h-full">
        <div
          className={`w-full h-full flex transition-transform duration-300 ease-in-out`}
          style={{
            transform: `translateX(-${imageIndex * 100}%)`,
          }}
          onClick={() => setShowFullScreenGallery(true)}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className={`w-full h-full object-cover flex-shrink-0 cursor-pointer
                    hover:scale-105 transition-transform duration-300 ease-in-out`}
            />
          ))}
        </div>
      </div>
      <ImageMoveButtons handleImageChange={handleImageChange} />
      <ImageCountButton
        imageCount={images.length}
        handleClick={() => setShowFullScreenGallery(true)}
      />
    </div>
  );
};

export default PreviewGallery;
