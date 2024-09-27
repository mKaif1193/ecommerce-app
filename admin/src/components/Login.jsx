/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Login = ({ setToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      const data = response.data;

      if (data.success) {
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-black hover:bg-black/90 duration-300 text-white w-full mt-2 px-4 py-2 rounded-md ${
              isLoading && "bg-black/90 cursor-default"
            }`}
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
