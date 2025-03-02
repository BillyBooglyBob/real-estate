import { Link } from "react-router-dom";
import homeImage from "../assets/images/home-image.avif";
import homeIntroBackgroundImage from "../assets/images/home-intro.jpg";
import InfiniteCarousel from "../components/Homepage/InfiniteCarousel";
import ListingsCarousel from "../components/Homepage/ListingsCarousel";
import ScrollRevealText from "../components/Homepage/Animate/ScrollRevealText";
import ScrollFadeSides from "../components/Homepage/Animate/ScrollFadeSides";
import ScrollSequentialReveal from "../components/Homepage/Animate/ScrollSequentialReveal";

export const Home = () => {
  return (
    <div className="flex flex-col bg-white">
      {/* Welcome screen */}
      <ScrollRevealText
        imgUrl={homeImage}
        content={
          <div className="flex flex-col gap-10 items-center text-white">
            <div className="flex justify-center items-center flex-col gap-5">
              <p className="font-noto">Curated Luxury Real Estate</p>
              <h1 className="uppercase text-7xl font-tenor text-center">
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
        }
      />

      {/* Home page intro */}
      <ScrollFadeSides
        imgUrl={homeIntroBackgroundImage}
        content={
          <div className="flex justify-center items-start flex-col gap-10">
            <h2 className="font-tenor text-2xl">
              UNPARALLELED MARKETING. <br /> WHITE GLOVE SERVICE.
            </h2>
            <span className="w-20 h-[1px] bg-black"></span>
            <h1 className="font-tenor text-5xl">ELEVATE REALTY GROUP</h1>
            <p className="font-noto text-start w-[50%]">
              ELEVATE Group is disrupting the industry with its fresh
              perspective on the client-broker relationship. With unique team
              synergy and comprehensive experience, the partners of ELEVATE
              Group understand that the greatest value of their enterprise lies
              in the quality and durability of the relationship they develop
              with you. ELEVATE Group goes beyond ordinary and traditional,
              proving that passion, creative thinking, and the relentless
              pursuit of their clients' success makes them the real estate
              experience that will last.
            </p>
          </div>
        }
      />

      {/* Company carousel */}
      <ScrollRevealText
        content={
          <div className="w-full mt-36 mb-20 flex justify-center items-center flex-col gap-16">
            <h1 className="uppercase font-tenor text-4xl text-black">
              as seen in
            </h1>
            <InfiniteCarousel />
          </div>
        }
      />

      {/* New listings */}
      <div>
        <ListingsCarousel />
      </div>

      {/* Stats bar */}
      <ScrollSequentialReveal
        headings={[
          { value: "1,000+", title: "Properties Sold" },
          { value: "10+", title: "Years Operated" },
          { value: "5/5", title: "Average Rating" },
        ]}
      />
    </div>
  );
};
