import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="Contact Us Image"
          className="w-full md:max-w-[480px]"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 William Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (051) 555-0132 <br /> Email: admin@estore.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button
            onClick={() => toast.info("Job openings coming soon!")}
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 active:bg-gray-700"
          >
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </>
  );
};

export default Contact;
