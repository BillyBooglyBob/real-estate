import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useEffect } from "react";

const googleLibraries = ["places"];

const GoogleMapAddressSearch = ({ children, handleChange }) => {
  const addressRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: googleLibraries,
    // Adding these options can help with loading reliability
    version: "weekly",
    language: "en"
  });

  // Handle cleanup
  useEffect(() => {
    return () => {
      if (addressRef.current) {
        addressRef.current = null;
      }
    };
  }, []);

  const handleOnPlacesChanged = () => {
    try {
      if (!window.google) {
        console.error("Google API is not loaded yet.");
        return;
      }

      const places = addressRef.current?.getPlaces();
      if (!places) {
        console.warn("No places data available");
        return;
      }

      if (places.length > 0 && places[0].formatted_address) {
        handleChange(places[0].formatted_address);
      } else {
        console.warn("No valid address found in places data");
      }
    } catch (error) {
      console.error("Error in handleOnPlacesChanged:", error);
    }
  };

  // Handle loading error
  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return <div>Error loading maps</div>;
  }

  // Show loading state or return null based on your preference
  if (!isLoaded || !window.google) {
    return <div>Loading...</div>; // or return null;
  }

  return (
    <StandaloneSearchBox
      onLoad={(ref) => {
        if (ref) {
          addressRef.current = ref;
        }
      }}
      onPlacesChanged={handleOnPlacesChanged}
    >
      {children || <input type="text" placeholder="Search address..." />}
    </StandaloneSearchBox>
  );
};

export default GoogleMapAddressSearch;