import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export const CreateListings = () => {
  const [listingData, setListingData] = useState({
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = () => {
    const length = files.length + listingData.imageUrls.length;
    if (length > 0 && length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setListingData({
            ...listingData,
            imageUrls: listingData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
        });
    } else if (length === 0) {
      setImageUploadError("Must upload at least 1 image");
      setUploading(false);
    } else {
      setImageUploadError("Can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      // make each filename unique
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% complete`);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setListingData({
      ...listingData,
      imageUrls: listingData.imageUrls.filter((_, i) => i !== index),
    });
  };

  console.log(listingData);

  return (
    <div className="max-w-3xl p-3 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-3">Create listing</h1>
      <form className="flex gap-4 flex-col sm:flex-row">
        <div className="flex flex-col gap-3">
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
        </div>
        <div className="flex flex-col mx-auto gap-3">
          <h1>Upload images</h1>
          <div className="flex gap-5">
            <label className="inline-flex justify-center p-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-300">
              <span>Choose Images</span>
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                placeholder="Parkings"
              />
            </label>
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className=" min-w-32 p-2 bg-gray-400 hover:bg-gray-500 rounded-md"
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {listingData.imageUrls.length > 0 &&
            listingData.imageUrls.map((url, index) => (
              <div key={url} className="flex justify-between border p-3">
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-red-700 uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="inline-flex justify-center p-2 bg-red-600 hover:bg-red-700 text-white">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
