import { useEffect, useState } from "react";
import axios from "axios";
import { FaBed, FaCar, FaShower } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [newListings, setnewListings] = useState([]);

  // get newest 3 listings
  useEffect(() => {
    const getNewListings = async () => {
      try {
        const res = await axios.get("/api/listings");
        const listings = res.data;

        // get the newest 3 listings
        setnewListings(listings.length < 3 ? listings : listings.slice(0, 3));
      } catch (error) {
        console.log(error.response.error.message);
      }
    };

    getNewListings();
  }, []);

  // when user click on a listing, bring to the actual listings page
  const checkListing = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-72 pl-10 pt-20">
        <h1 className="font-bold text-4xl">Find and search your next</h1>
        <h1 className="font-bold text-4xl">
          dream <span className="text-red-400">home...</span>
        </h1>
      </div>
      <div className="pl-10 pt-10 pb-20">
        <h1 className="font-semibold text-2xl mb-10">New listings</h1>
        <div className="flex gap-5 ">
          {newListings.map((listing) => (
            <div
              onClick={() => checkListing(listing._id)}
              key={listing._id}
              className="cursor-pointer flex flex-col gap-3 min-w-64 max-h-90 rounded-lg bg-gray-200"
            >
              <img
                src={listing.imageUrls[0]}
                alt="Property image"
                className="object-cover h-52 min-w-80 overflow-hidden rounded-t-lg"
              />

              <div className="flex flex-col gap-3 p-3">
                <p>{listing.address}</p>
                <div className="flex gap-3">
                  <p className="flex gap-3">
                    <FaBed /> {listing.specifications.rooms}
                  </p>
                  <p className="flex gap-3">
                    <FaShower /> {listing.specifications.bathrooms}
                  </p>
                  <p className="flex gap-3">
                    <FaCar /> {listing.specifications.parkings}
                  </p>
                </div>
                <p>${listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
