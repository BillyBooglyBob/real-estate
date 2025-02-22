import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../util/util";
import { motion } from "framer-motion";

import { BiSolidBath } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdViewStream } from "react-icons/md";
import { PiHouseLine } from "react-icons/pi";

import PreviewGallery from "../components/Gallery/PreviewGallery";

export const UserListings = () => {
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
    <div className="p-14 bg-[#faf9f2] w-full h-full">
      <h1 className="mb-5 text-3xl font-tenor">User Listings</h1>
      {/* User listings */}
      {listings.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-5 text-5xl">
          <PiHouseLine />
          <h1>No listings</h1>
          <button
            onClick={() => navigate("/listings/create")}
            className="mt-10 border-black border px-3 py-4 text-2xl rounded-sm hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
          >
            Create a listing
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-5">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="flex flex-col justify-between gap-5 w-full h-full p-5 mb-5 border border-gray-700 rounded-sm"
          >
            {/* Listing images */}
            <div className="h-[400px]">
              <PreviewGallery images={listing.imageUrls} />
            </div>

            {/* Listing details */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="font-beto font-semibold text-xl">
                    {listing.address}
                  </h1>
                </div>
                <h1 className="font-beto font-semibold text-xl">
                  {formatPrice(listing.price)}
                </h1>
              </div>
              <div className="flex gap-5 items-center justify-end">
                <div>
                  <h2 className="flex items-center justify-end gap-5 text-xl">
                    <IoBed className="w-7 h-7" /> {listing.specifications.rooms}
                  </h2>
                </div>
                <div>
                  <h2 className="flex items-center justify-end gap-5 text-xl">
                    <BiSolidBath className="w-7 h-7" />{" "}
                    {listing.specifications.bathrooms}
                  </h2>
                </div>
                <div>
                  <h2 className="flex items-center justify-end gap-5 text-xl">
                    <FaCarAlt className="w-7 h-7" />{" "}
                    {listing.specifications.parkings}
                  </h2>
                </div>
              </div>
            </div>

            {/* View, Edit, Delete buttons */}
            <div className={buttonStyle.container}>
              <MenuButton
                handleClick={() => navigate(`/listings/${listing._id}`)}
                title="View Listing"
              >
                <MdViewStream />
              </MenuButton>

              <MenuButton
                handleClick={() => navigate(`/listings/edit/${listing._id}`)}
                title="Edit Listing"
              >
                <MdEditNote />
              </MenuButton>

              <MenuButton
                handleClick={() => handleDeleteListing(listing._id)}
                title="Delete Listing"
              >
                <MdDelete />
              </MenuButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuButton = ({ children, handleClick, title }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
      className={buttonStyle.button}
      title={title}
    >
      {children}
    </motion.button>
  );
};

const buttonStyle = {
  container: "flex justify-between items-center",
  button: "text-[#595959] uppercase px-3 py-2 rounded-sm text-2xl",
};
