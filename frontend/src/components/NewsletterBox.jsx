import { useState } from "react";
import { toast } from "react-toastify";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setEmail("");
    toast.success("Thank you for subscribing");
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe to our newsletter and get 20% off your first purchase
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 outline-none"
        />
        <button
          type="submit"
          className="bg-black hover:bg-black/90 duration-300 active:bg-gray-700 text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
