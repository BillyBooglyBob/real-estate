import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

// Define the libraries to be loaded for the google maps api
// to prevent useJsApiLoader from reloading unnecessarily
const googleLibraries = ["places"];

const GoogleMapAddressSearch = ({ children, handleChange }) => {
  // Adding Google Map API address-search functionality
  const addressRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: googleLibraries,
  });

  const handleOnPlacesChanged = () => {
    const newAddress = addressRef.current.getPlaces()[0].formatted_address;
    handleChange(newAddress);
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (addressRef.current = ref)}
      onPlacesChanged={handleOnPlacesChanged}
    >
      {children}
    </StandaloneSearchBox>
  );
};

export default GoogleMapAddressSearch;
