import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../redux/user";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await axios.get("/api/auth/sign-out");

      dispatch(LOGOUT());
      navigate('/sign-in')
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>LOG OUT</button>
    </div>
  );
};
