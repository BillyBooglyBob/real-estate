import { useEffect, useState, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateListings = () => {
  const navigate = useNavigate();

  const addressRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBkfb8fn_iXQ_pwLoTH90o4vMTFIOu9Ouc",
    libraries: ["places"],
  });

  const [listingData, setListingData] = useState({
    imageUrls: [],
    address: "",
    description: "",
    price: 0,
    type: "Sell",
    specifications: {
      rooms: 0,
      bathrooms: 0,
      parkings: 0,
    },
  });

  // state for image uploading
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  // states for listing creation
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // store image in firebase storage
  const handleImageSubmit = () => {
    const length = files.length + listingData.imageUrls.length;
    // Only allow 1-6 images to be uploaded
    if (length > 0 && length < 7) {
      // Start loading
      setUploading(true);
      setImageUploadError(false);

      // Create an array of promises to upload each image
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      // Wait for all promises to resolve and upload the images at once
      Promise.all(promises)
        .then((urls) => {
          setListingData({
            ...listingData,
            imageUrls: listingData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (3mb max per image)");
          setUploading(false);
        });
    } else if (length === 0) {
      setImageUploadError("Must upload at least 1 image");
      setUploading(false);
    } else {
      setImageUploadError("Can only upload 6 images per listing");
      setUploading(false);
    }
  };

  // store image in firebase storage
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

  // delete image from the listing data
  const handleDeleteImage = (index) => {
    setListingData({
      ...listingData,
      imageUrls: listingData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // submit data to the create listing api route
  // catch error
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await axios.post("/api/listings", listingData);
      setLoading(false);
      console.log(res.data);
      navigate(`/listings/${res.data._id}`);
      // navigate to the current user listings
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  // Upload images automatically when new images are added
  useEffect(() => {
    if (files.length > 0) {
      handleImageSubmit();
    }
  }, [files]);

  // handle address change
  const handleOnPlacesChanged = () => {
    let address = addressRef.current.getPlaces();
    console.log(address);
  };

  return (
    <div className="w-full py-14 mx-auto bg-[#faf9f2] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mb-3">Create listing</h1>
      {/* Listing form */}
      <form onSubmit={handleSubmit} className="flex gap-4 flex-col sm:flex-row">
        {/* Listing details */}
        <div className="flex flex-col gap-3">
          <label className="flex flex-col">
            Address
            {/* Google maps search box */}
            {isLoaded && (
              <StandaloneSearchBox
                onLoad={(ref) => (addressRef.current = ref)}
                onPlacesChanged={handleOnPlacesChanged}
              >
                <input
                  type="text"
                  className="border border-gray-600 w-full focus:border-black rounded-lg p-2 pl-3"
                  placeholder="Address"
                  onChange={(e) =>
                    setListingData({ ...listingData, address: e.target.value })
                  }
                />
              </StandaloneSearchBox>
            )}
          </label>
          <label className="flex flex-col">
            Description
            <textarea
              type="text"
              className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
              placeholder="Description"
              onChange={(e) =>
                setListingData({ ...listingData, description: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col">
            Price $
            <input
              type="number"
              className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
              placeholder="$100000"
              onChange={(e) =>
                setListingData({ ...listingData, price: e.target.value })
              }
            />
          </label>
          <div className="flex gap-10">
            <label className="flex flex-col">
              Listing Type
              <select
                onChange={(e) =>
                  setListingData({ ...listingData, type: e.target.value })
                }
                className="border border-gray-600 focus:border-black rounded-md min-h-10"
              >
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
                onChange={(e) =>
                  setListingData({
                    ...listingData,
                    specifications: {
                      ...listingData.specifications,
                      rooms: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="flex flex-col">
              Baths
              <input
                type="number"
                className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3 max-w-20"
                placeholder="Baths"
                onChange={(e) =>
                  setListingData({
                    ...listingData,
                    specifications: {
                      ...listingData.specifications,
                      bathrooms: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label className="flex flex-col">
              Parkings
              <input
                type="number"
                className="border border-gray-600 focus:border-black rounded-lg p-2 pl-3 max-w-20"
                placeholder="Parkings"
                onChange={(e) =>
                  setListingData({
                    ...listingData,
                    specifications: {
                      ...listingData.specifications,
                      parkings: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        </div>
        {/* Upload images and Create button */}
        <div className="flex flex-col mx-auto gap-3">
          <h1>Upload images</h1>
          <div className="flex gap-5">
            <label className="inline-flex justify-center p-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-300">
              <span>{uploading ? "Uploading..." : "Choose Images"}</span>
              <input
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                placeholder="Parkings"
              />
            </label>
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
          <button
            disabled={loading}
            className="inline-flex justify-center p-2 bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
          {error && (
            <p className=" bg-red-400 p-2 rounded-lg text-white">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
};
