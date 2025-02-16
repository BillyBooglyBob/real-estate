import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DropDown from "./DropDown";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [searchInput, setSearchInput] = useState("");

  // navigate to search page
  const handleSearch = (e) => {
    e.preventDefault();

    // Set URL search params to the search input
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchInput);

    const searchQuery = urlParams.toString();

    navigate(`/listings/search?${searchQuery}`);
  };

  // automatically update value inside the search bar when the url is changed
  // manually
  useEffect(() => {
    // Get the search term from the URL and set it to the search input
    const urlParams = new URLSearchParams(location.search);
    const searchTermParams = urlParams.get("searchTerm");
    if (searchTermParams) {
      setSearchInput(searchTermParams);
    }
  }, []);

  return (
    <header className="shadow-sm bg-white p-5">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="ml-2 font-bold text-black">DreamDwell Realty</h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="ml-14 bg-slate-100 rounded-lg flex items-center justify-between p-3 w-[40rem]"
        >
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="Search suburb or postcode"
            className="bg-transparent focus:outline-none w-full"
            value={searchInput}
          />
          <button>
            <FaSearch className="text-slate-400 cursor-pointer" />
          </button>
        </form>
        <DropDown name="Menu"
          links={[
            { name: "Home", link: "/" },
            { name: "Sign In", link: "/sign-in" },
            { name: "Sign Up", link: "/sign-up" },
            { name: "Profile", link: "/profile" },
            { name: "Create Listings", link: "/listings/create" },
            { name: "Search Listings", link: "/listings/search" },
          ]}
        />

        {/*
        Home button
        Buy
        - Latest listings
        Sell
        - Sell with us
        Rent
        - Latest listings
        About us
        - About BOB real estate
        - Privacy policy
        Profile
        - Sign in
        - Sign up
        - Profile

        remove search bar
        */}
        <nav>
          {user && (
            <div className="mr-2">
              <Link to="/profile">
                <button className="hover:bg-slate-300 w-20 h-12 rounded-lg bg-slate-200">
                  Profile
                </button>
              </Link>
            </div>
          )}
          {!user && (
            <div className="mr-2 flex gap-1">
              <Link to="/">
                <button className="hidden sm:inline hover:bg-slate-300 w-20 h-12 rounded-lg">
                  Home
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="hover:bg-slate-300 w-20 h-12 rounded-lg">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
