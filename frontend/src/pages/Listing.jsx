import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCountButton from "../components/Listing/Button/ImageCountButton";
import ImageMoveButtons from "../components/Listing/Button/ImageMoveButtons";
import FullScreenGallery from "../components/Listing/FullScreenGallery";
import PreviewGallery from "../components/Listing/PreviewGallery";
import Banner from "../components/Listing/Banner";
import Reveal from "../components/Listing/Animate/Reveal";

import { MdRealEstateAgent } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

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
    seller: {
      email: "",
      username: "",
    },
  });
  // keep track of which image to currently display
  const [imageIndex, setImageIndex] = useState(0);
  // keep track of whether to show the full screen gallery
  const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);

  // Retrieve listing data using the id
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

  // Handle changing the current image displayed
  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % listingData.imageUrls.length;
    setImageIndex(newIndex >= 0 ? newIndex : listingData.imageUrls.length - 1);
  };

  // Handle showing the full screen gallery
  const handleShowFullScreenGallery = () => {
    setShowFullScreenGallery(true);
  };

  const handleHideFullScreenGallery = () => {
    setShowFullScreenGallery(false);
  };

  return (
    <div className="w-full h-full bg-[#faf9f2] pl-10 pt-20 flex flex-col">
      {/* Image pop up */}
      {showFullScreenGallery && (
        <FullScreenGallery
          handleClose={handleHideFullScreenGallery}
          handleImageChange={handleImageChange}
          listingData={listingData}
          imageIndex={imageIndex}
        />
      )}
      <Reveal>
        <div className="font-beto font-semibold text-wrap max-w-[600px] text-4xl text-gray-600 mb-8">
          {listingData.address}
        </div>
      </Reveal>
      {/* Image & Banner Section */}
      <div className="flex md:h-[500px] h-[400px] flex-col md:flex-row">
        {/* Left: PreviewGallery */}
        <div className="relative md:w-[60%] w-full h-full">
          <PreviewGallery
            imageIndex={imageIndex}
            handleClick={handleShowFullScreenGallery}
            listingData={listingData}
          />
          <ImageMoveButtons handleImageChange={handleImageChange} />
          <ImageCountButton
            imageCount={listingData.imageUrls.length}
            handleClick={handleShowFullScreenGallery}
          />
        </div>

        {/* Right: Banner */}
        <div className="md:w-[40%] w-full h-full">

            <Banner listingData={listingData} />

        </div>
      </div>
      {/* Description & Contact Agent Section */}
      <div className="flex flex-col md:flex-row  ">
        {/* Left: Description */}
        <div className="md:w-[60%] w-full p-12 text-[#595959] bg-[#faf9f2]flex flex-col gap-5">
          <Reveal>
            <h1 className="text-2xl font-bold mb-2">Description</h1>
          </Reveal>
          <Reveal>
            <p>{listingData.description}</p>
          </Reveal>
        </div>

        {/* Right: Contact Agent */}
        <div
          className={`md:w-[40%] w-full p-8 pt-12 pr-28 
            flex flex-col gap-5 sticky text-xl text-[#595959] bg-[#faf9f2]`}
        >
          <h1 className="text-2xl font-bold mb-2">Contact</h1>
          <Reveal>
            <div className="flex justify-between items-center">
              <h1 className="flex items-center gap-5">
                <MdRealEstateAgent /> Seller
              </h1>
              <p>{listingData.seller.username}</p>
            </div>
          </Reveal>
          <div className="bg-[#595959] w-full h-[1px]"></div>
          <Reveal>
            <div className="flex justify-between items-center">
              <h1 className="flex items-center gap-5">
                <TfiEmail /> Email
              </h1>
              <p>{listingData.seller.email}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
