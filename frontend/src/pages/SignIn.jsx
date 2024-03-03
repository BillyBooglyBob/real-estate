import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/user";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  // for displaying error to the screen if present
  const [error, setError] = useState(null);
  // disable submit button if loading
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // reset error and start loading when there is a new sign in attempt
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/sign-in", formData);
      // save data to global state
      dispatch(LOGIN(res.data));
      
      setLoading(null);

      // navigate back to homepage if successful
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      setLoading(null);
    }
  };

  return (
    <div className=" bg-gray-100 flex justify-center item-center min-h-screen w-full">
      <div className=" bg-white min-h-screen w-2/5 flex justify-center items-center flex-col gap-3 p-10 shadow-md">
        <h1 className=" text-2xl font-bold">Sign in</h1>
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-5 min-w-full"
        >
          <input
            className=" border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            type="text"
            placeholder="Email"
            id="email"
            onChange={handleChange}
          />
          <input
            className=" border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
          >
            SIGN IN
          </button>
          {error && (
            <div className=" bg-red-400 p-2 rounded-lg text-white">{error}</div>
          )}
        </form>
        <div>
          Don't have an account?{" "}
          <span className=" text-blue-600">
            <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
