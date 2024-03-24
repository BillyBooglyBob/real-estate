import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ViewListings = () => {
  /* Get all the listings of the user currently signed in
get the email first, get the user with that email, get the listings with the user 
store list of listings.

Display the listings, each with a link to the relevant listing page
Delete button to remove the listing
*/
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
    console.log(id);
    navigate(`/listings/${id}`);
  };

  return (
    <div className="mt-5 ml-20">
      <h1 className="mb-5 font-bold text-3xl">User Listings</h1>
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="flex flex-row justify-between gap-5 w-96 max-h-62 p-5 mb-5 border border-gray-700 rounded-lg"
        >
          <div
            onClick={() => checkListing(listing._id)}
            className="flex gap-5 items-center cursor-pointer"
          >
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
            <img
              src={listing.imageUrls[0]}
              alt="Property image"
              className="object-cover rounded-lg w-32 h-32"
            />
          </div>

          <button className="text-red-700 uppercase hover:opacity-75">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
