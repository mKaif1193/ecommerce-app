import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="E-Store Logo" className="mb-5 w-20" />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover a world of premium products at unbeatable prices. At
            E-Store, we bring you a curated selection of high-quality products,
            ensuring quality and value in every purchase. Whether you&apos;re
            looking for the latest trends or timeless classics, we&apos;ve got
            something for everyone.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>051 1234567</li>
            <li>contact@estore.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2024 @ E-Store.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
