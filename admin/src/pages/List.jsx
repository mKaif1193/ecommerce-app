/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      const data = response.data;

      if (data.success) {
        setList(data.products.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    toast.error("Sorry, you can't remove an item!");

    // setIsLoading(true);
    // try {
    //   const response = await axios.post(
    //     `${backendUrl}/api/product/remove`,
    //     { id },
    //     { headers: { token } }
    //   );

    //   const data = response.data;

    //   if (data.success) {
    //     toast.success(data.message);
    //     await fetchList();
    //   } else {
    //     toast.error(data.message);
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h3 className="text-2xl mb-4">All Products List</h3>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img src={item.image[0]} alt={item.name} className="w-12" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <img
                src={assets.bin_icon}
                alt="Delete Icon"
                onClick={() => removeProduct(item._id)}
                className="w-4 mx-auto sm:w-5 cursor-pointer"
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
