import { useParams } from "react-router-dom";
import { CreateEditListingForm } from "../components/CreateEditListing/CreateEditLIstingForm";

const EditListing = () => {
  const { id } = useParams();

  const API = {
    method: "PUT",
    url: `/api/listings/${id}`,
  };

  return <CreateEditListingForm title="Edit Listing" currentId={id} API={API} />;
};

export default EditListing;
