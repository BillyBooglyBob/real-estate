import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/user";

const AuthForm = ({ title, actionUrl, inputs }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(actionUrl, formData);
      setLoading(null);

      if (title === "sign in") {
        // Successful sign in
        // save sign-in data to redux & navigate to homepage
        dispatch(LOGIN(res.data));
        navigate("/");
      } else if (title === "sign up") {
        // Successful sign up, navigate to sign in page
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.response.data.error);
      setLoading(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className=" min-h-screen w-2/5 flex justify-center items-start flex-col gap-3 p-10">
        <h1 className="text-2xl font-noto capitalize">{title}</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full"
        >
          {inputs.map((input, index) => (
            <input
              key={index}
              {...input}
              className="border border-gray-600 focus:border-black rounded-sm p-2 pl-3"
              onChange={handleChange}
            />
          ))}
          <div className="flex justify-between">
            <div className="font-noto">
              {title === "sign in"
                ? "Don't have an account? "
                : "Have an account? "}
              <span className=" text-blue-600 font-noto">
                <Link to={`/${title === "sign in" ? "sign-up" : "sign-in"}`}>
                  {title === "sign in" ? "Sign up" : "Sign in"}
                </Link>
              </span>
            </div>
            <button
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white rounded-sm p-2 w-32"
            >
              {title.toUpperCase()}
            </button>
          </div>
          {error && (
            <div className="bg-red-400 p-2 rounded-lg text-white">
              {error.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
