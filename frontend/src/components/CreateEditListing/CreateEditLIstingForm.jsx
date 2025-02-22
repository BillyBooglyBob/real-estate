import { useEffect, useState, useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import DropDown from "./DropDown";
import ImageCarousel from "./ImageCarousel";

// Define the libraries to be loaded for the google maps api
// to prevent useJsApiLoader from reloading unnecessarily
const googleLibraries = ["places"];

export const CreateEditListingForm = ({ currentId, API }) => {
  const navigate = useNavigate();

  // Adding Google Map API address-search functionality
  const addressRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: googleLibraries,
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
    seller: {
      email: "",
      username: "",
    },
  });

  // set the current listing data if it exists
  useEffect(() => {
    if (!currentId) return;

    const getListingData = async () => {
      try {
        const res = await axios.get(`/api/listings/${currentId}`);
        console.log(res.data);
        setListingData(res.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getListingData();
  }, [currentId]);

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

    // Prevent submission if no images are uploaded
    if (listingData.imageUrls.length === 0) {
      setImageUploadError("Must upload at least 1 image");
      return;
    }

    try {
      setLoading(true);
      setError(false);

      let res = null;
      if (API.method === "PUT") {
        res = await axios.put(API.url, listingData);
      } else {
        res = await axios.post("/api/listings", listingData);
      }

      setLoading(false);
      console.log(res.data);

      // navigate to the current user listings
      navigate(`/listings/${res.data._id}`);
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
    const newAddress = addressRef.current.getPlaces()[0].formatted_address;
    setListingData((prev) => ({ ...prev, address: newAddress }));
  };

  return (
    <div className="w-full py-14 mx-auto bg-[#faf9f2] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-tenor text-center mb-3 flex justify-start items-center w-[50%]">
        Create listing
      </h1>
      {/* Listing form */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col sm:flex-row w-[50%]"
      >
        {/* Listing details & Create button */}
        <div className="flex flex-col gap-3 flex-[2] h-full">
          {/* Google maps search box */}
          {isLoaded && (
            <StandaloneSearchBox
              onLoad={(ref) => (addressRef.current = ref)}
              onPlacesChanged={handleOnPlacesChanged}
            >
              <Input
                handleChange={setListingData}
                inputType="text"
                placeholder="Address"
                inputField={listingData.address}
                inputFieldType="address"
              />
            </StandaloneSearchBox>
          )}
          <Input
            handleChange={setListingData}
            placeholder="Description"
            inputField={listingData.description}
            inputFieldType="description"
            inputType="textarea"
          />
          <Input
            handleChange={setListingData}
            placeholder="Price"
            inputField={listingData.price}
            inputFieldType="price"
            inputType="text"
          />
          <div className="flex gap-5 justify-between">
            <DropDown
              options={[
                { value: "Sell", description: "For Sale" },
                { value: "Rent", description: "For Rent" },
              ]}
              handleChange={setListingData}
              value={listingData.type === "Sell" ? "For Sale" : "For Rent"}
            />
            <Input
              handleChange={setListingData}
              placeholder="Beds"
              inputField={listingData.specifications.rooms}
              inputFieldType="rooms"
              inputType="number"
            />
            <Input
              handleChange={setListingData}
              placeholder="Bathrooms"
              inputField={listingData.specifications.bathrooms}
              inputFieldType="bathrooms"
              inputType="number"
            />
            <Input
              handleChange={setListingData}
              placeholder="Parkings"
              inputField={listingData.specifications.parkings}
              inputFieldType="parkings"
              inputType="number"
            />
          </div>
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

        {/* Upload images */}
        <div className="flex flex-col mx-auto gap-3 flex-[1]">
          <label className="w-full inline-flex justify-center p-2 bg-gray-200 border border-gray-300 rounded-sm shadow-sm cursor-pointer hover:bg-gray-300">
            <span>{uploading ? "Uploading..." : "Upload Images"}</span>
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
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {listingData.imageUrls.length > 0 && (
            <ImageCarousel
              images={listingData.imageUrls}
              handleClick={handleDeleteImage}
            />
          )}
        </div>
      </form>
    </div>
  );
};
