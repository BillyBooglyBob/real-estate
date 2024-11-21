import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export const Home = () => {
  const navigate = useNavigate();
  const [newListings, setnewListings] = useState([]);

  // get newest 3 listings
  useEffect(() => {
    const getNewListings = async () => {
      try {
        const res = await axios.get("/api/listings/search");
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
    <div className="flex flex-col bg-gray-200">
      {/* Home page intro */}
      <div className="min-h-72 pl-10 pt-20">
        <h1 className="font-bold text-4xl">Find and search your next</h1>
        <h1 className="font-bold text-4xl">
          dream <span className="text-red-400">home...</span>
        </h1>
      </div>
      {/* New listings */}
      <div className="pl-10 pt-10 pb-20">
        <h1 className="font-semibold text-2xl mb-10">New listings</h1>
        <div className="flex flex-col gap-5 sm:flex-row">
          {newListings.map((listing) => (
            <ListingItem
              listing={listing}
              checkListing={checkListing}
              key={listing._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
