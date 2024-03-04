import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/user";
import { Navigate, useNavigate } from "react-router-dom";

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
        <div>
          <button onClick={handleSignout} className="bg-gray-400 text-white">
            LOG OUT
          </button>
        </div>
      )}

      {!user && <Navigate to={"/sign-in"} />}
    </>
  );
};
