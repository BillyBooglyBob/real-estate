import { useState } from "react";

export const CreateListings = () => {
  const [listing, setListing] = useState(null);

  return (
    <div className="max-w-3xl p-3 mx-auto bg-slate-300">
      <h1 className="text-3xl font-bold text-center">Create listing</h1>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          Address
          <input
            type="text"
            className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            placeholder="Address"
          />
        </label>
        <label className="flex flex-col">
          Description
          <textarea
            type="text"
            className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            placeholder="Description"
          />
        </label>
        <label className="flex flex-col">
          Price $
          <input
            type="number"
            className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            placeholder="$100000"
          />
        </label>
        <div className="flex gap-10">
          <label className="flex flex-col">
            Listing Type
            <select className="border border-gray-600 focus:border-black rounded-md min-h-10">
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </select>
          </label>
          <label className="flex flex-col">
            Beds
            <input
              type="number"
              className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3 max-w-20"
              placeholder="Beds"
            />
          </label>
          <label className="flex flex-col">
            Baths
            <input
              type="number"
              className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3 max-w-20"
              placeholder="Baths"
            />
          </label>
          <label className="flex flex-col">
            Parkings
            <input
              type="number"
              className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3 max-w-20"
              placeholder="Parkings"
            />
          </label>
        </div>
        <div className="flex gap-5 ">
          <label className="flex-grow inline-flex justify-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-300">
            <span>Choose Images</span>
            <input type="file" className="hidden" placeholder="Parkings" />
          </label>
          <button className="flex-grow-2 rounded-md px-2 bg-gray-400 hover:bg-gray-500 text-white">Upload</button>
        </div>
        <button className="inline-flex justify-center p-2 bg-red-600 hover:bg-red-700 text-white">
          Create
        </button>
      </form>
    </div>
  );
};
