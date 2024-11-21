import React from "react";
import { FaBed, FaCar, FaShower, FaUserCircle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const ListingItem = ({ listing, checkListing }) => {
  return (
    <div
      onClick={() => checkListing(listing._id)}
      key={listing._id}
      className="hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col min-w-64 max-w-96 max-h-90 rounded-lg bg-white overflow-hidden relative"
    >
      <div className="w-full flex justify-end bg-red-300 h-7 z-10">
        <FaUserCircle className="bg-white rounded-full w-10 h-auto absolute top-2 right-2"/>
      </div>
      <img
        src={listing.imageUrls[0]}
        alt="Property image"
        className="object-cover h-52 w-80 overflow-hidden hover:scale-105 transition-all duration-300"
      />

      <div className="flex flex-col gap-3 p-3 z-10">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <CiLocationOn />
            <p className="truncate">{listing.address}</p>
          </div>
          <div>
            <p className="font-bold">For {listing.type}</p>
          </div>
        </div>
        <p>${listing.price}</p>
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
      </div>
    </div>
  );
};

export default ListingItem;
