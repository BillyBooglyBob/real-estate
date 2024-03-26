import { useParams } from "react-router-dom";
import {
  FaBed,
  FaCar,
  FaShower,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

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
  });

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

  // keep track of which image to currently display
  const [imageIndex, setImageIndex] = useState(0);

  // change the image index
  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % listingData.imageUrls.length;
    setImageIndex(newIndex >= 0 ? newIndex : listingData.imageUrls.length - 1);
  };

  return (
    <div className="flex flex-col">
      <div className="mx-10 min-h-80 flex justify-between items-center flex-col sm:flex-row">
        <div className="w-1/3 order-2 sm:order-1">
          <h1 className="text-3xl font-bold mt-5">{listingData.address}</h1>
          <p className="mt-5 flex gap-3">
            <FaBed /> {listingData.specifications.rooms}
            <FaShower /> {listingData.specifications.bathrooms}
            <FaCar /> {listingData.specifications.parkings}
          </p>
          <h2 className="mt-10">${listingData.price}</h2>
        </div>
        {/* images, track index of current image, buttons */}
        <div className="w-2/3 order-1 sm:order-2 flex mt-5">
          <button
            onClick={() => handleImageChange(-1)}
            className="hover:text-black text-gray-600"
          >
            <FaArrowLeft />
          </button>
          <img
            src={listingData.imageUrls[imageIndex]}
            className="px-5"
            alt="Property image"
          />
          <button
            onClick={() => handleImageChange(1)}
            className="hover:text-black text-gray-600"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="mt-5 mb-5 mx-20 flex gap-40 justify-between flex-row">
        <div>
          <h1 className="font-bold text-2xl mb-2 ">Description:</h1>
          <p className="">{listingData.description}</p>
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-2">Contact:</h1>
          <p>000-000-000</p>
        </div>
      </div>
    </div>
  );
};
