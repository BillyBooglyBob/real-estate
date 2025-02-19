const PreviewGallery = ({ imageIndex, handleClick, listingData }) => {
  return (
    <div className="relative overflow-hidden w-full h-full">
      <div
        className={`w-full h-full flex transition-transform duration-300 ease-in-out`}
        style={{
          transform: `translateX(-${imageIndex * 100}%)`,
        }}
        onClick={handleClick}
      >
        {listingData.imageUrls.map((src, index) => (
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
  );
};

export default PreviewGallery;
