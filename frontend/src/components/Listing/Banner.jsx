import { IoIosBed } from "react-icons/io";
import { BiSolidBath } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { formatPrice } from "../../util/util";

const Banner = ({ listingData }) => {
  return (
    <div className="bg-[#595959] flex-1 h-full text-[#faf9f2] p-8 flex flex-col">
      {/* Specifications & price */}
      <div className="flex-[2] flex flex-col justify-evenly">
        <div className="font-tenor flex items-center gap-5 text-3xl">
          <IoIosBed /> {listingData.specifications.rooms} <BiSolidBath />
          {listingData.specifications.bathrooms} <FaCarAlt />
          {listingData.specifications.parkings}
        </div>
        <div className="font-tenor flex flex-col gap-4">
          <h2 className="uppercase font-noto text-md">home for sale</h2>
          <h1 className="text-2xl">
            Offers from {formatPrice(listingData.price)}
          </h1>
        </div>
      </div>
      <span className="w-full h-[1px] bg-white"></span>
      <div className="flex-1 font-noto flex flex-col items-center pr-20">
        <h1 className="uppercase w-full my-10">Specifications</h1>
        <div className="w-full px-10 bg-white h-[1px] mb-5"></div>
        <div className="flex justify-between w-full pr-5">
          <div className="flex items-center gap-10">
            <FaMoneyBill />
            <h2 className="uppercase">Property type</h2>
          </div>
          <p>{listingData.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
