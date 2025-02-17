import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="uppercase font-tenor text-3xl w-full mb-10">
        elevate real estate
      </div>
      <div className="uppercase font-tenor text-2xl flex w-full">
        <div className="flex-1">licensed in jupiter mars</div>
        <div className="flex-[3] flex justify-evenly items-start text-xl gap-5">
          <div className="flex flex-col gap-10 flex-1">
            <div className="flex items-center gap-5">
              <TfiEmail /> Email: williamjys@gmail.com
            </div>
            <div className="flex items-center gap-5">
              <FaMapMarkerAlt /> Address: 10 East Random Rd, Pi Floor, Mars,
              Solar 100
            </div>
          </div>
          <div className="flex items-center gap-5 flex-1">
            <FaPhoneAlt /> Phone Number: 041234567
          </div>
        </div>
      </div>
      <div className="w-full relative flex items-center justify-center my-10">
        <span className="w-full h-[1px] bg-gray-500"></span>
        <button
          className="absolute w-10 h-10 rotate-45 border-black border-[1px] bg-white 
             flex items-center justify-center hover:bg-black hover:text-white
             transition-all duration-300 ease-in-out"
          onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
          <HiOutlineChevronDoubleUp className="-rotate-45" />
        </button>
      </div>
      <div className="flex justify-between font-tenor w-full">
        <div>Designed and developed by William Sun</div>
        <div>© Copyright 2025 | Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
