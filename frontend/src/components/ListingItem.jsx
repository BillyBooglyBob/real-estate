import { motion } from "framer-motion";
import { formatPrice } from "../util/util";
import { useState } from "react";

const ListingItem = ({ listing, checkListing, loading }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <div
      onClick={() => {
        if (!loading && checkListing && listing?._id) {
          checkListing(listing._id);
        }
      }}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      className={`transition-all duration-300 relative
        cursor-pointer flex flex-col 
        bg-white overflow-hidden flex-1 w-full h-full`}
    >
      {/* Hover overlay */}
      <div
        className={`absolute w-full h-full bg-white
          ${showHover ? "opacity-80" : "opacity-0"}`}
      ></div>

      <div
        className={`absolute w-full h-full 
            transition-all duration-300 ease-in-out flex justify-center items-center
            ${showHover ? "opacity-100" : "opacity-0"}`}
      >
        <button
          className={`border-black border-[2px] w-48 h-12 uppercase
              hover:bg-black hover:text-white transition-all duration-300 ease-in-out`}
        >
          View Property
        </button>
      </div>

      {/* Image */}
      <motion.div
        className="w-full h-80 overflow-hidden"
        variants={shimmerVariants}
        animate={loading ? "animate" : "hidden"}
      >
        {!loading && (
          <div>
            <img
              src={listing.imageUrls[0]}
              alt="Property image"
              className="object-cover w-full h-full"
            />
            <p
              className={`font-tenor uppercase absolute top-0 right-0 w-28 flex items-center justify-center h-8
                bg-black text-white`}
            >
              {listing.type}
            </p>
          </div>
        )}
      </motion.div>

      {/* Description */}
      {loading ? (
        <motion.div className="flex flex-col gap-3 p-3">
          <div className="flex items-center gap-2 justify-between">
            <motion.div
              className="flex items-center gap-2 w-32 h-10"
              variants={shimmerVariants}
              animate={"animate"}
            ></motion.div>
            <motion.div
              className="w-20 h-6"
              variants={shimmerVariants}
              animate={"animate"}
            ></motion.div>
          </div>
          <motion.p
            className="w-20 h-6"
            variants={shimmerVariants}
            animate={"animate"}
          ></motion.p>
          <motion.div
            className="flex gap-3 w-32 h-10"
            variants={shimmerVariants}
            animate={"animate"}
          ></motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3 p-3 items-center">
          <p className="truncate font-tenor text-2xl capitalize">
            {listing.address}
          </p>
          <p className="font-noto">
            {listing.specifications.rooms} BD |{" "}
            {listing.specifications.bathrooms} BA |{" "}
            {listing.specifications.parkings} PK
          </p>
          <p className="font-noto">{formatPrice(listing.price)}</p>
        </div>
      )}
    </div>
  );
};

export default ListingItem;

const shimmerVariants = {
  animate: {
    backgroundColor: ["#E0E0E0", "#F5F5F5", "#E0E0E0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
