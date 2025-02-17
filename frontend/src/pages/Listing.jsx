import { useNavigate, useParams } from "react-router-dom";
import {
  FaBed,
  FaCar,
  FaShower,
  FaArrowLeft,
  FaArrowRight,
  FaRegUserCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";

export const Listing = () => {
  const navigate = useNavigate();

  // Get the id of the webpage
  // contains listing to extract data for
  const { id } = useParams();

  // when user click on a listing, bring to the actual listings page
  const checkListing = (id) => {
    navigate(`/listings/${id}`);
  };

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
  const [moreListings, setMoreListings] = useState([]);

  // retrieve listing data using the id
  useEffect(() => {
    const getListingData = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        console.log(res.data);
        setListingData(res.data);

        // Get other listings as well
        const moreRes = await axios.get("/api/listings/search");
        const { listings, totalListings, totalPages } = moreRes.data;

        // get the newest 3 listings
        setMoreListings(listings.length < 3 ? listings : listings.slice(0, 3));
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getListingData();
  }, [id]);

  // keep track of which image to currently display
  const [imageIndex, setImageIndex] = useState(0);

  // change the image index which results in different image being displayed
  const handleImageChange = (change) => {
    const newIndex = (imageIndex + change) % listingData.imageUrls.length;
    setImageIndex(newIndex >= 0 ? newIndex : listingData.imageUrls.length - 1);
  };

  return (
    <div className=" w-full flex flex-col">
      <div className="pl-10 h-[30rem] w-full flex justify-between items-center flex-col sm:flex-row ">
        {/* Address, specifications and price */}
        <div className="w-1/3 order-2 sm:order-1 flex flex-col">
          <h1 className="text-3xl font-bold mt-5">{listingData.address}</h1>
          <p className="mt-5 flex gap-3">
            <FaBed /> {listingData.specifications.rooms}
            <FaShower /> {listingData.specifications.bathrooms}
            <FaCar /> {listingData.specifications.parkings}
          </p>
          <h2 className="mt-10">${listingData.price}</h2>
          <h2 className="mt-10 font-bold">For {listingData.type}</h2>
        </div>
        {/* images, track index of current image, buttons */}
        <div className="w-2/3 order-1 sm:order-2 flex relative bg-red-200">
          <button
            onClick={() => handleImageChange(-1)}
            className="hover:text-black text-gray-600 absolute inset-y-56 left-[2rem] bg-gray-400 opacity-[0.5] hover:opacity-[0.8] w-20 h-20 rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>
          <div className="w-full h-[30rem]">
            <img
              src={listingData.imageUrls[imageIndex]}
              className=" object-cover w-full h-[30rem]"
              alt="Property image"
            />
          </div>
          <button
            onClick={() => handleImageChange(1)}
            className="hover:text-black text-gray-600 absolute inset-y-56 right-[2rem] bg-gray-400 opacity-[0.5] hover:opacity-[0.8] w-20 h-20 rounded-full flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* Listing details & Contact */}
      <div className=" flex min-h-[100vh] px-[8rem] pt-10 mb-10 ">
        <div className="flex pr-10 flex-col gap-[5rem]">
          <div>
            <h1 className="font-bold text-2xl mb-2">Description:</h1>
            <p>{listingData.description}</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-2">More properties:</h1>
            <div className="flex flex-col gap-5 sm:flex-row">
              {moreListings.map((listing) => (
                <ListingItem
                  listing={listing}
                  checkListing={checkListing}
                  key={listing._id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-[5rem] p-5 rounded-lg h-[23rem] w-[18rem] flex flex-col shadow-md">
          <div className="flex justify-center items-center gap-3">
            <FaRegUserCircle className="text-7xl mx-auto" />
            <div className="flex flex-col gap-[0.5rem]">
              <div className="text-xl text-blue-700 ">Blah@gmail.com</div>
              <div className="border-gray-200 rounded-lg border-[1px] w-20 p-[1px] flex items-center justify-center">
                04010101
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-300 h-[0.1rem] my-5"></div>
          <button className="bg-red-600 hover:bg-red-700 text-white w-full h-[3.5rem] rounded-lg">
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};
