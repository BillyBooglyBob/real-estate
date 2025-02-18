import { FaBed, FaCar, FaShower } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";

const ListingItem = ({ listing, checkListing, loading }) => {
  return (
    <div
      onClick={() => {
        if (!loading && checkListing && listing?._id) {
          checkListing(listing._id);
        }
      }}
      className="hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col min-w-64 max-w-96 max-h-90 rounded-lg bg-white overflow-hidden relative"
    >
      <motion.div
        className="h-52 w-80 overflow-hidden"
        variants={shimmerVariants}
        animate={loading ? "animate" : "hidden"}
      >
        {!loading && (
          <img
            src={listing.imageUrls[0]}
            alt="Property image"
            className="object-cover h-52 w-80 hover:scale-105 transition-all duration-300"
          />
        )}
      </motion.div>

      {loading ? (
        <motion.div className="flex flex-col gap-3 p-3 z-10">
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
        <div className="flex flex-col gap-3 p-3 z-10">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <CiLocationOn />
              <p className="truncate">{listing.address}</p>
            </div>
            <div>
              <p className="font-bold">For {listing.type}</p>
            </div>
          </div>
          <p>${listing.price}</p>
          <div className="flex gap-3">
            <p className="flex gap-3">
              <FaBed /> {listing.specifications.rooms}
            </p>
            <p className="flex gap-3">
              <FaShower /> {listing.specifications.bathrooms}
            </p>
            <p className="flex gap-3">
              <FaCar /> {listing.specifications.parkings}
            </p>
          </div>
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
