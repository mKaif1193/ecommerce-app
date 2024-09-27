import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const Verify = () => {
  const { setCartItems, navigate, backendUrl, token } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [isLoading, setIsLoading] = useState(false);

  const verifyPayment = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifystripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success(response.data.message);
      } else {
        navigate("/cart");
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="flex text-xl items-center justify-center w-full h-full">
      {isLoading ? <Loader /> : "Verification Successful"}
    </div>
  );
};

export default Verify;
