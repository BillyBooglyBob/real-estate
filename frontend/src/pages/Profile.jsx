import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/user";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleSignout = async () => {
    try {
      const res = await axios.get("/api/auth/sign-out");

      dispatch(LOGOUT());
      navigate("/sign-in");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      {user && (
        <div className="mx-20 flex flex-col gap-10 item-center min-h-screen p-14 ">
          <div className="flex justify-between items-center w-full max-h-5">
            <h1 className=" text-4xl font-extrabold">Profile</h1>
            <button
              onClick={handleSignout}
              className=" text-white bg-gray-700 hover:bg-gray-900 w-34 h-12 p-3 rounded-lg"
            >
              Log out
            </button>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <Link to={"/listings/view"}>
              <div className="bg-gray-100 p-4 rounded-xl shadow-md min-h-40 cursor-pointer">
                <img src="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/track-property-7129fdcb02993d5c8f29.svg" />
                <div className="font-bold mt-4 mb-4">Track your properties</div>
                <p>Stay up to date with your home or properties you own.</p>
              </div>
            </Link>
            <Link to={"/listings/create"}>
              <div className="bg-gray-100 p-4 rounded-xl shadow-md min-h-40 cursor-pointer">
                <img src="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/private-landlord-31fca422a6f744faca86.svg" />
                <div className="font-bold mt-4 mb-4">Create new listing</div>
                <p>Create and manage your property listings</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {!user && <Navigate to={"/sign-in"} />}
    </>
  );
};
