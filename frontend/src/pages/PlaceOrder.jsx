/* eslint-disable no-case-declarations */
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const PlaceOrder = () => {
  const {
    products,
    delivery_fee,
    navigate,
    backendUrl,
    token,
    getCartAmount,
    cartItems,
    setCartItems,
  } = useContext(ShopContext);

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const responseCOD = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );

          if (responseCOD.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success(responseCOD.data.message);
          } else {
            toast.error(responseCOD.data.message);
          }
          break;

        case "stripe":
          toast.error("Sorry, stripe is not used for demo purposes!");

          // const responseStripe = await axios.post(
          //   `${backendUrl}/api/order/stripe`,
          //   orderData,
          //   { headers: { token } }
          // );

          // if (responseStripe.data.success) {
          //   const { session_url } = responseStripe.data;
          //   window.location.replace(session_url);
          // } else {
          //   toast.error(responseStripe.data.message);
          // }
          break;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <input
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip-Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>

        <input
          type="number"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              />
              <img
                src={assets.stripe_logo}
                alt="Stripe Logo"
                className="h-5 mx-4"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black hover:bg-black/90 active:bg-slate-700 duration-300 text-white text-sm px-16 py-3 ${
                loading && "bg-black/90 cursor-default"
              }`}
            >
              {loading ? <Loader /> : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
