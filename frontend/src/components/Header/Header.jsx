import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./DropDown";

export const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return; // Only run on the Home page

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change when scrolling past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`z-10  w-full p-5 h-28 flex justify-between items-center px-24 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "fixed top-0 bg-white text-black shadow-md" // After scroll: White background, black text
            : "fixed top-0 bg-transparent text-white h-28" // Initial: Transparent background, white text
          : "bg-white text-black shadow-md z-20" // Other pages: White background, black text
      }`}
    >
      <Link to="/">
        <div className="flex flex-col text-center">
          <h1 className="font-tenor text-6xl tracking-tight leading-none">ELEVATE</h1>
          <h2 className="text-lg font-tenor tracking-widest">REAL ESTATE</h2>
        </div>
      </Link>

      <nav className="flex-[0.8] flex justify-evenly items-center z-20">
        <Link to="/">
          <h1 className="ml-2 font-medium text-md">Home</h1>
        </Link>
        <DropDown
          name="Buy"
          links={[{ name: "Latest listings", link: "/listings/search?searchTerm=&type=Sell&sort=created_at&order=desc" }]}
        />
        <DropDown
          name="Rent"
          links={[{ name: "Latest listings", link: "/listings/search?searchTerm=&type=Rent&sort=created_at&order=desc" }]}
        />
        <DropDown
          name="Sell"
          links={[{ name: "Create listing", link: `${user ? "/listings/create" : "/sign-up"}` }]}
        />
        <DropDown
          name="About us"
          links={[
            { name: "About BOB realty", link: "/" },
            { name: "Privacy policy", link: "/" },
          ]}
        />
        <DropDown
          name="Profile"
          links={[
            { name: "Sign In", link: "/sign-in" },
            { name: "Sign Up", link: "/sign-up" },
            { name: "Profile", link: "/profile" },
          ]}
        />
      </nav>
    </header>
  );
};
