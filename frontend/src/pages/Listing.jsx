import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCountButton from "../components/Listing/Button/ImageCountButton";
import ImageMoveButtons from "../components/Listing/Button/ImageMoveButtons";
import ImagePopUp from "../components/Listing/ImagePopUp";

export const Listing = () => {
  // Get the id of the webpage
  // contains listing to extract data for
  const { id } = useParams();

  // initialise the fields so data retrieved can be easily copied in
  const [listingData, setListingData] = useState({
    imageUrls: [],
    address: "",
    description: "",
    price: 0,
    type: "",
    specifications: {
      rooms: 0,
      bathrooms: 0,
      parkings: 0,
    },
    seller: "",
  });
  // keep track of which image to currently display
  const [imageIndex, setImageIndex] = useState(0);
  const [showImagePopUp, setShowImagePopUp] = useState(false);

  // retrieve listing data using the id
  useEffect(() => {
    const getListingData = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        console.log(res.data);
        setListingData(res.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getListingData();
  }, [id]);

  // change the current image displayed
  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % listingData.imageUrls.length;
    setImageIndex(newIndex >= 0 ? newIndex : listingData.imageUrls.length - 1);
  };

  // Handle pop up
  const handleShowImagePopUp = () => {
    setShowImagePopUp(true);
    console.log("Show image pop up");
  };

  const handleHideImagePopUp = () => {
    setShowImagePopUp(false);
  };

  return (
    <div className="w-full h-full bg-[#faf9f2] pl-10 pt-20">
      {/* Image pop up */}
      {showImagePopUp && (
        <ImagePopUp
          handleClose={handleHideImagePopUp}
          handleImageChange={handleImageChange}
          listingData={listingData}
          imageIndex={imageIndex}
        />
      )}

      <div className="font-beto font-semibold text-wrap w-[600px] text-4xl text-gray-600 mb-8">
        2815/380 Murray Street Perth 6000, Western Australia
      </div>
      <div className="flex h-[500px] md:flex-row flex-col">
        <div className="relative flex-[2] h-full">
          <div className="relative overflow-hidden w-full h-full">
            <div
              className={`w-full h-full flex transition-transform duration-300 ease-in-out`}
              style={{
                transform: `translateX(-${imageIndex * 100}%)`,
              }}
              onClick={handleShowImagePopUp}
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
          <ImageMoveButtons handleImageChange={handleImageChange} />
          <ImageCountButton
            imageCount={listingData.imageUrls.length}
            handleClick={handleShowImagePopUp}
          />
        </div>
        <div className="bg-[#595959] flex-1 h-full"></div>
      </div>
      <div>Description + (Broker & Links)</div>
    </div>
  );
};
