import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ViewListings = () => {
  // Get all the listings of the current logged in user
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  // get the current user logged in
  const user = useSelector((state) => state.user.currentUser);
  const userEmail = user.email;

  // retrieve users listing
  useEffect(() => {
    const getUserListings = async () => {
      try {
        const res = await axios.get(`/api/listings/view/${userEmail}`);

        setListings(res.data.listings);
      } catch (error) {
        console.log("Error");
      }
    };

    getUserListings();
  }, [userEmail]);

  // when user click on a listing, bring to the actual listings page
  const checkListing = (id) => {
    navigate(`/listings/${id}`);
  };

  // deletes the listing
  const handleDeleteListing = async (id) => {
    try {
      await axios.post(`/api/listings/${id}`, id);
      setListings(listings.filter((listing) => listing._id != id));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="mt-5 ml-20 p-14">
      <h1 className="mb-5 text-4xl font-extrabold">User Listings</h1>
      {/* User listings */}
      {listings.length === 0 && <div>No listings</div>}
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="flex flex-row justify-between gap-5 w-96 max-h-62 p-5 mb-5 border border-gray-700 rounded-lg"
        >
          <div
            onClick={() => checkListing(listing._id)}
            className="flex gap-5 items-center cursor-pointer"
          >
            {/* Listing details */}
            <div>
              <h1 className="font-bold">Address:</h1>
              <p>{listing.address}</p>
              <div>
                <h1 className="font-bold">Rooms:</h1>
                <p>{listing.specifications.rooms}</p>
                <h1 className="font-bold">Bathrooms:</h1>
                <p>{listing.specifications.bathrooms}</p>
                <h1 className="font-bold">Parkings:</h1>
                <p>{listing.specifications.parkings}</p>
              </div>
              <p>${listing.price}</p>
            </div>
            {/* Listing first image */}
            <img
              src={listing.imageUrls[0]}
              alt="Property image"
              className="object-cover rounded-lg w-32 h-32"
            />
          </div>

          {/* Delete button */}
          <button
            onClick={() => handleDeleteListing(listing._id)}
            className="text-red-700 uppercase hover:opacity-75"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
