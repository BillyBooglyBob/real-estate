import { useNavigate } from "react-router-dom";
import { FaBed, FaCar, FaShower } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export const SearchPage = () => {
  const navigate = useNavigate();

  // search query
  const [filters, setFilters] = useState({
    searchTerm: "",
    type: "Sell",
    sort: "created_at",
    order: "desc",
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // change the filters when the corresponding input changes
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "searchTerm") {
      setFilters({ ...filters, searchTerm: e.target.value });
    }

    if (e.target.id === "type") {
      setFilters({ ...filters, type: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setFilters({ ...filters, sort, order });
    }
  };

  // navigate to the search page again with the updated query
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filters.searchTerm);
    urlParams.set("type", filters.type);
    urlParams.set("sort", filters.sort);
    urlParams.set("order", filters.order);

    const searchQuery = urlParams.toString();
    navigate(`/listings/search?${searchQuery}`);
  };

  // update filter inputs when the URL changes
  // also fetch new listings based on the new URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    // set default values in case none are present
    if (searchTermFromUrl || typeFromUrl || sortFromUrl || orderFromUrl) {
      setFilters({
        searchTerm: searchTermFromUrl,
        type: typeFromUrl || "Sell",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const getListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await axios.get(`/api/listings/search?${searchQuery}`);
      setListings(res.data);
      setLoading(false);
    };

    getListings();
  }, [location.search]);

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-5 justify-between px-5 sm:px-20 mt-10"
        >
          <label>
            <input
              onChange={handleChange}
              value={filters.searchTerm}
              id="searchTerm"
              type="text"
              className="w-full min-w-64 sm:min-w-96 border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            />
          </label>
          <div className="flex flex-col gap-5 sm:flex-row">
            <label className="flex items-center gap-5">
              Type:
              <select
                onChange={handleChange}
                id="type"
                className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
                defaultValue={"Sell"}
              >
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
            </label>
            <label className="flex items-center gap-5">
              Sort by:
              <select
                onChange={handleChange}
                id="sort_order"
                defaultValue={"createdAt_desc"}
                className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
              >
                <option value="price_desc">Price: High to Low</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="createdAt_desc">Newest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </label>
            <button className="min-w-24 sm:min-w-32 p-2 bg-gray-200 hover:bg-gray-300 rounded-md">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="ml-20 mb-10">
        <h1 className="text-3xl font-bold mt-10">Listings</h1>
        <div className="flex flex-wrap gap-5 mt-5">
          {loading ? (
            <h1>Loading ...</h1>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="hover:shadow-lg cursor-pointer flex flex-col gap-3 min-w-64 max-w-96 max-h-90 rounded-lg bg-gray-200"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
