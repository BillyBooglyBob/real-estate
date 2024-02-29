import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="shadow-md">
      <div className="flex justify-between items-center mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">DreamDwell Realty</h1>
        </Link>
        <form className="bg-slate-200 rounded-lg flex items-center justify-between p-3">
          <input
            type="text"
            name="search"
            placeholder="Search ..."
            className="bg-transparent focus:outline-none w-54 sm:w-64"
          />
          <FaSearch className="text-slate-400" />
        </form>
        <div className="flex gap-3">
          <Link to="/">
            <button className="hidden sm:inline">Home</button>
          </Link>
          <Link to="/about">
            <button className="hidden sm:inline">About</button>
          </Link>
          <Link to="/sign-in">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </header>
  );
};
