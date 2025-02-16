import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DropDown from "./DropDown";

export const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 z-10  w-full p-5 flex justify-between items-center px-24 transition-all duration-300 ease-in-out 
      ${
        isHomePage
          ? lastScrollY <= 50
            ? " bg-transparent text-white h-28"
            : isHidden
            ? "bg-transparent text-transparent h-0"
            : "bg-white text-black h-28"
          : isHidden
          ? "bg-transparent text-transparent h-0"
          : "bg-white text-black shadow-md z-20 h-28"
      }`}

      // style={{trans}}
    >
      <Link to="/">
        <div className="flex flex-col text-center">
          <h1 className="font-tenor text-6xl tracking-tight leading-none">
            ELEVATE
          </h1>
          <h2 className="text-lg font-tenor tracking-widest">REAL ESTATE</h2>
        </div>
      </Link>

      <nav className="flex-[0.8] flex justify-evenly items-center z-20">
        <Link to="/">
          <h1 className="ml-2 font-medium text-md">Home</h1>
        </Link>
        <DropDown
          name="Buy"
          links={[
            {
              name: "Latest listings",
              link: "/listings/search?searchTerm=&type=Sell&sort=created_at&order=desc",
            },
          ]}
        />
        <DropDown
          name="Rent"
          links={[
            {
              name: "Latest listings",
              link: "/listings/search?searchTerm=&type=Rent&sort=created_at&order=desc",
            },
          ]}
        />
        <DropDown
          name="Sell"
          links={[
            {
              name: "Create listing",
              link: `${user ? "/listings/create" : "/sign-up"}`,
            },
          ]}
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
