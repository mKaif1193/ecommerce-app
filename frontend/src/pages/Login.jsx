import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/signup`, {
          name,
          email,
          password,
        });
        const data = response.data;

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("ecommerce-user-token", data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        const data = response.data;

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("ecommerce-user-token", data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")}>
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer hover:underline">Sign Up</span>
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")}>
            Already have an account?{" "}
            <span className="cursor-pointer hover:underline">Login</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-black hover:bg-black/90 duration-300 active:bg-gray-700 text-white font-light px-8 py-2 mt-4 ${
          isLoading && "bg-black/90 cursor-default"
        }`}
      >
        {isLoading ? <Loader /> : { currentState }}
      </button>
    </form>
  );
};

export default Login;
