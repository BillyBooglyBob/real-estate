import { Link } from "react-router-dom";
import homeImage from "../assets/images/home-image.avif";
import homeIntroBackground from "../assets/images/home-intro-background.webp";
import InfiniteCarousel from "../components/Home/InfiniteCarousel";
import ListingsCarousel from "../components/Home/ListingsCarousel";

export const Home = () => {
  return (
    <div className="flex flex-col ">
      {/* Welcome screen */}
      <div
        className="relative h-screen w-full bg-cover bg-center text-white flex justify-center items-center flex-col"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

        <div className="relative flex justify-center items-center flex-col gap-10">
          <div className="flex justify-center items-center flex-col gap-5">
            <p className="font-noto">Curated Luxury Real Estate</p>
            <h1 className="uppercase text-7xl font-tenor">
              elevate real estate
            </h1>
            <p className="font-noto uppercase">Find your dream home</p>
          </div>
          <Link to="/listings/search" className="uppercase">
            <button className="uppercase border-white border-2 h-14 w-64 hover:bg-white hover:text-[rgb(111,101,101)] transition ease-in-out duration-200">
              search all homes
            </button>
          </Link>
        </div>
      </div>

      {/* Home page intro */}
      <div className="w-full h-80 mt-28 px-40 pt-6 relative">
        <img
          src={homeIntroBackground}
          className="-z-10 absolute left-0 top-[-70px] h-[550px] "
        />
        <div className="flex justify-center items-center flex-col gap-10">
          <h2 className="font-tenor text-2xl">
            UNPARALLELED MARKETING. WHITE GLOVE SERVICE.
          </h2>
          <span className="w-20 h-[1px] bg-black"></span>
          <h1 className="font-tenor text-5xl">ELEVATE REALTY GROUP</h1>
          <p className="font-noto text-center">
            ELEVATE Group is disrupting the industry with its fresh perspective
            on the client-broker relationship. With unique team synergy and
            comprehensive experience, the partners of ELEVATE Group understand
            that the greatest value of their enterprise lies in the quality and
            durability of the relationship they develop with you. ELEVATE Group
            goes beyond ordinary and traditional, proving that passion, creative
            thinking, and the relentless pursuit of their clients' success makes
            them the real estate experience that will last.
          </p>
        </div>
      </div>

      {/* Company carousel */}
      <div className="mt-36 mb-20 flex justify-center items-center flex-col gap-16">
        <h1 className="uppercase font-tenor text-4xl">as seen in</h1>
        <InfiniteCarousel />
      </div>

      {/* New listings */}
      <div>
        <ListingsCarousel />
      </div>
    </div>
  );
};
