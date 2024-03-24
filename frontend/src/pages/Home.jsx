import { useEffect, useState } from "react";
import axios from "axios"

export const Home = () => {
  const [newlistings, setNewListings] = useState([]);

  // get newest 3 listings
  useEffect(() => {
    const getNewListings = async () => {
      // const listing = await axios.get()
    }

    getNewListings()
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-green-100 min-h-72 pl-10 pt-20">
        <h1 className="font-bold text-4xl">Find and search your next</h1>
        <h1 className="font-bold text-4xl">
          dream <span className="text-red-400">home...</span>
        </h1>
      </div>
      <div className="bg-blue-100 pl-10 pt-10">
        <h1 className="font-semibold text-2xl">New listings</h1>
        <div></div>
      </div>
    </div>
  );
};
