import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";
import { Pagination } from "../components/SearchPage/Pagination";
import SearchFilter from "../components/SearchPage/SearchFilter";

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
  const [listingsProperties, setListingsProperties] = useState({
    totalListings: 0,
    totalPages: 0,
    currentPage: 0,
    itemsPerPage: 4,
  });
  const [loading, setLoading] = useState(false);

  // change the filters when the corresponding input changes
  const handleSearchBarChange = (e) => {
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

  const handleSearchFilterChange = (type, value) => {
    if (type === "type") {
      setFilters({ ...filters, type: value });
    } else {
      const sort = value.split("_")[0];
      const order = value.split("_")[1];
      setFilters({ ...filters, sort, order });
    }

    // Change the page number to 0 when the filter changes
    setListingsProperties((prev) => ({ ...prev, currentPage: 0 }));
  };

  // navigate to the search page again (refresh the page) with the updated query
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filters.searchTerm);
    urlParams.set("type", filters.type);
    urlParams.set("sort", filters.sort);
    urlParams.set("order", filters.order);
    urlParams.set("limit", listingsProperties.itemsPerPage);
    urlParams.set(
      "startIndex",
      listingsProperties.currentPage * listingsProperties.itemsPerPage
    );

    const searchQuery = urlParams.toString();

    navigate(`/listings/search?${searchQuery}`);
  };

  // update filter inputs when the URL or the current page number changes
  // also fetch new listings based on the new URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    // Pagination
    // Fetch only specific number of items based on the page number
    // reduces fetching cost
    urlParams.set("limit", listingsProperties.itemsPerPage);
    urlParams.set(
      "startIndex",
      listingsProperties.currentPage * listingsProperties.itemsPerPage
    );

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
      const { listings, totalListings, totalPages } = res.data;
      setListings(listings);
      setListingsProperties((prev) => ({ ...prev, totalListings, totalPages }));
      setLoading(false);
      console.log("Data fetched", res.data);
    };

    getListings();
  }, [location.search]);

  return (
    <div className="min-h-72 my-10 px-28">
      {/* Search input and filters */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-5 justify-between mt-5 max-h-20"
      >
        <label className="relative border border-black focus:border-2">
          <input
            onChange={handleSearchBarChange}
            value={filters.searchTerm}
            placeholder="Search for a property"
            id="searchTerm"
            type="text"
            className="pl-10 w-full min-w-64 sm:min-w-96  p-2"
          />
          <CiSearch className="absolute left-3 top-3" />
        </label>
        <div className="flex flex-col gap-5 sm:flex-row">
          <SearchFilter
            value={filters.type === "Sell" ? "For sale" : "For rent"}
            handleChange={(value) => handleSearchFilterChange("type", value)}
            options={[
              { value: "Sell", text: "For sale" },
              { value: "Rent", text: "For rent" },
            ]}
          />
          <SearchFilter
            value={
              filters.sort === "price" && filters.order === "desc"
                ? "Price: High to Low"
                : filters.sort === "price" && filters.order === "asc"
                ? "Price: Low to High"
                : filters.sort === "createdAt" && filters.order === "desc"
                ? "Newest"
                : "Oldest"
            }
            handleChange={(value) =>
              handleSearchFilterChange("sort_order", value)
            }
            options={[
              { value: "price_desc", text: "Price: High to Low" },
              { value: "price_asc", text: "Price: Low to High" },
              { value: "createdAt_desc", text: "Newest" },
              { value: "createdAt_asc", text: "Oldest" },
            ]}
          />
          <button
            className={`min-w-24 sm:min-w-32 p-2 bg-black text-white hover:brightness-125 rounded-sm`}
          >
            Search
          </button>
        </div>
      </form>

      {/* Search results */}
      <div className="pb-10">
        <h1 className="text-xl font-noto mt-10">
          Real Estate & Homes for Sale
        </h1>
        <h1 className="text-base font-noto text-gray-500">
          {listingsProperties.totalListings} results
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-28 mt-5 min-h-[200px]">
          {loading ? (
            [1, 2].map((n) => <ListingItem loading={loading} key={n} />)
          ) : listings.length === 0 ? (
            <h1>No results</h1>
          ) : (
            listings.map((listing) => (
              <ListingItem
                listing={listing}
                checkListing={(id) => navigate(`/listings/${id}`)}
                key={listing._id}
                loading={loading}
              />
            ))
          )}
        </div>
      </div>

      {/* Page numbers (Pagination) */}
      <Pagination
        listingsProperties={listingsProperties}
        handleChangeListingProperties={setListingsProperties}
      />
    </div>
  );
};
