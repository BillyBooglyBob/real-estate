import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [searchInput, setSearchInput] = useState("");

  // navigate to search page
  const handleSearch = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchInput);

    const searchQuery = urlParams.toString();

    navigate(`/listings/search?${searchQuery}`);
  };

  // automatically update value inside the search bar when the url is changed
  // manually
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermParams = urlParams.get("searchTerm");
    if (searchTermParams) {
      setSearchInput(searchTermParams);
    }
  }, []);

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="ml-2 font-bold">DreamDwell Realty</h1>
        </Link>
        <form
          onSubmit={handleSearch}
          className="ml-14 bg-slate-200 rounded-lg flex items-center justify-between p-3"
        >
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="Search ..."
            className="bg-transparent focus:outline-none w-54 sm:w-64"
            value={searchInput}
          />
          <button>
            <FaSearch className="text-slate-400 cursor-pointer" />
          </button>
        </form>
        <nav>
          {user && (
            <div className="mr-2">
              <Link to="/profile">
                <button className="hover:bg-slate-300 w-20 h-12 rounded-lg">
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
