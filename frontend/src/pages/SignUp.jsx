import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  // for displaying error to the screen if present
  const [error, setError] = useState(null);
  // disable submit button if loading
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/sign-up", formData);
      setLoading(null);
      navigate("/sign-in");
    } catch (error) {
      setError(error.response.data.error);
      setLoading(null);
    }
  };

  return (
    <div className=" bg-gray-100 flex justify-center item-center min-h-screen w-full">
      <div className=" bg-white min-h-screen w-2/5 flex justify-center items-center flex-col gap-3 p-10 shadow-md">
        <h1 className=" text-2xl font-bold">Create Account</h1>
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-5 min-w-full"
        >
          <input
            className=" border border-gray-600 focus:border-black rounded-lg p-2 pl-3"
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
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
            SIGN UP
          </button>
          {error && (
            <div className=" bg-red-400 p-2 rounded-lg text-white">
              {error.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
        </form>
        <div className="flex gap-2">
          Have an account?
          <span className=" text-blue-600">
            <Link to="/sign-in">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
