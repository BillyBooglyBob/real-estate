import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { formatPrice } from "../../util/util";

const ListingsCarousel = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [currentListing, setCurrentListing] = useState(0);

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await axios.get("/api/listings/search");
        const listings = res.data;
        setListings(listings.length < 5 ? listings : listings.slice(0, 5));
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    getListings();
  }, []);

  const nextListing = () => {
    setCurrentListing((prev) => (prev + 1) % (listings.length * 2));
    console.log(currentListing);
  };

  const prevListing = () => {
    setCurrentListing((prev) => (prev - 1) % (listings.length * 2));
  };

  // when user clicks on a listing, bring to the actual listing page
  const goToListing = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="relative w-full mx-auto flex justify-center items-center flex-col bg-[#133e45] py-14 overflow-hidden">
      {/* Slider images */}
      {listings.length > 0 && (
        <div className="text-white flex w-full ml-28 overflow-hidden gap-x-8">
          {/* Problem is correct positioning */}
          {[...listings, ...listings].map((listing, index) => (
            <div
              key={listing._id}
              className={`transition-all duration-300 ease-in-out flex-shrink-0 w-[80%]`}
              style={{
                transform: `translateX(calc(-${currentListing} * (100% + 32px)))`,
              }}
              onClick={() => goToListing(listing._id)}
            >
              {/* Listing image */}
              <div className="w-full h-[600px] overflow-hidden relative cursor-pointer group">
                <img
                  src={listing.imageUrls?.[0]}
                  alt={`listing-${index}`}
                  className={`w-full h-full object-cover group-hover:scale-105 transform 
                    transition-all duration-300 ease-in-out`}
                />
                <button
                  className="absolute bottom-0 right-0 w-20 h-20 bg-gray-300 text-white 
                  flex justify-center items-center hover:bg-orange-400 transition-all duration-300"
                >
                  <HiArrowLongRight />
                </button>
              </div>

              {/* Listing content */}
              <div className="p-2 flex flex-col gap-5 mt-2">
                <h1 className="font-beto text-3xl">{listing.address}</h1>
                <div className="flex flex-col gap-2">
                  <p className="font-noto text-1xl">
                    {formatPrice(listing.price)}
                  </p>
                  <p className="font-noto text-1xl">
                    {listing.specifications.rooms} Rooms |{" "}
                    {listing.specifications.bathrooms} Baths |{" "}
                    {listing.specifications.parkings} Parkings
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slider Menu */}
      <div className="w-full flex justify-between px-14 mt-4">
        {/* Forward + backward button */}
        <div className="text-white flex gap-10">
          <button onClick={prevListing}>
            <IoIosArrowBack />
          </button>
          <button onClick={nextListing}>
            <IoIosArrowForward />
          </button>
        </div>

        {/* Image buttons */}
        <div className="flex gap-10">
          {listings.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentListing(index)}
              className={`w-5 h-5 rounded-full ${
                currentListing % listings.length == index
                  ? "bg-white"
                  : "bg-gray-600"
              }`}
            ></button>
          ))}
        </div>

        <Link to="/listings/search">
          <button className="text-white uppercase font-noto text-[13px] border-white border-[1px] px-7 py-2 hover:bg-white hover:text-[#133e45] transition-all duration-300">
            View All Properties
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingsCarousel;
