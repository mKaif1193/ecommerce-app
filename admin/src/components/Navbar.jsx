import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img src={assets.logo} alt="E-Store Admin Logo" className="w-20" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-800 hover:bg-gray-700 duration-300 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
