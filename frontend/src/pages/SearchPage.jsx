import { useParams } from "react-router-dom";
import { FaBed, FaCar, FaShower } from "react-icons/fa";
import { useState } from "react";

export const SearchPage = () => {
  // search query
  const { input } = useParams();
  const [listings, setListings] = useState([]);
  // possible search filters
  // search term
  // type: sell or rent
  // Sort: price low to high, high to low, newest, oldest

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-green-100 flex flex-col sm:flex-row gap-5 justify-between px-20 mt-10"
        >
          <label>
            <input
              type="text"
              className="w-full min-w-96 border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            />
          </label>
          <div className="flex gap-5">
            <label className="flex items-center gap-5">
              Type:
              <select className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3">
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
            </label>
            <label className="flex items-center gap-5">
              Sort by
              <select className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3">
                <option value="">Price: Low to High</option>
                <option value="">Price: High to Low</option>
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </label>
            <button className="min-w-32 p-2 bg-gray-200 hover:bg-gray-300 rounded-md">
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold mt-10 ml-20">Listings</h1>
        <div className="flex flex-col gap-5 sm:flex-row">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="shadow-md cursor-pointer flex flex-col gap-3 min-w-64 max-w-96 max-h-90 rounded-lg bg-gray-200"
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
