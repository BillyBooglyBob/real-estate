import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const [searchInput, setSearchInput] = useState("");

  // navigate to search page
  const handleSearch = () => {
    setSearchInput("")
    // ensures there is always an input to search by
    const input = searchInput === "" ? "default" : searchInput
    navigate(`/listings/search/${input}`);
  };

  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="ml-2 font-bold">DreamDwell Realty</h1>
        </Link>
        <form className="ml-14 bg-slate-200 rounded-lg flex items-center justify-between p-3">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            name="search"
            placeholder="Search ..."
            className="bg-transparent focus:outline-none w-54 sm:w-64"
            value={searchInput}
          />
          <FaSearch
            onClick={() => handleSearch()}
            className="text-slate-400 cursor-pointer"
          />
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
