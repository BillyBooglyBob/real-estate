import { CreateEditListingForm } from "../components/CreateEditListing/CreateEditLIstingForm";

export const CreateListings = () => {
  const API = {
    method: "POST",
    url: "/api/listings",
  };

  return <CreateEditListingForm API={API} />;
};
