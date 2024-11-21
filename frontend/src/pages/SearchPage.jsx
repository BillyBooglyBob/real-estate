import { useNavigate } from "react-router-dom";
import { FaBed, FaCar, FaShower } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";

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

  // navigate to the search page again (refresh the page) with the updated query
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
      console.log("searchQuery", searchQuery);
      const res = await axios.get(`/api/listings/search?${searchQuery}`);
      setListings(res.data);
      setLoading(false);
    };

    getListings();
  }, [location.search]);

  // when user click on a listing, bring to the actual listings page
  const checkListing = (id) => {
    navigate(`/listings/${id}`);
  };

  return (
    <div className="bg-gray-200 p-5 min-h-[32.7rem]">
      {/* Search input and filters */}
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
            <button className="min-w-24 sm:min-w-32 p-2 bg-white hover:bg-gray-300 rounded-md">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search results */}
      <div className="ml-20 mb-10">
        <h1 className="text-3xl font-bold mt-10">Listings</h1>
        <div className="flex flex-wrap gap-5 mt-5">
          {loading ? (
            <h1>Loading ...</h1>
          ) : listings.length === 0 ? (
            <h1>No results</h1>
          ) : (
            listings.map((listing) => (
              <ListingItem
                listing={listing}
                checkListing={checkListing}
                key={listing._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
