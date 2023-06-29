import {
  FaFacebook,
  FaFax,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaMailBulk,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../assets/webDevProF.png";

const Footer = () => {
  return (
    <div className="">
      <div className="md:flex justify-between w-full gap-4 text-white p-4 bg-[#024980]">
        <div className="">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="" className="w-20 h-20" />
            <h2 className="text-2xl font-bold">My Client</h2>
          </div>
          <div className="flex justify-normal items-center space-x-4 my-5">
            <FaFacebook className="w-6 h-6" />
            <FaTwitter className="w-6 h-6" />
            <FaGithub className="w-6 h-6" />
            <FaInstagram className="w-6 h-6" />
          </div>
          <div className="space-x-4">
            <Link to="/about">
              <button className="btn bg-[#012E52] text-white hover:text-gray-700 border-0 shadow-lg btn-sm px-4">
                About Us
              </button>
            </Link>
            <Link to="/services">
              <button className="btn bg-[#012E52] text-white hover:text-gray-700 border-0 shadow-lg btn-sm px-4">
                Our Services
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <h2 className="text-1xl font-bold border-b-2 mb-2">Contact Us:</h2>
          <p className="flex items-center">
            <FaPhoneAlt className="mr-2" /> 01512456235, 0245235654
          </p>
          <p className="flex items-center">
            <FaFax className="mr-2" /> 0151245624512
          </p>
          <p className="flex items-center">
            <FaMailBulk className="mr-2" /> myclient@gmail.com
          </p>
          <p className="flex items-center">
            <FaGlobe className="mr-2" /> https://www.myclient.com
          </p>
        </div>
        <div className="">
          <h2 className="text-1xl font-bold border-b-2 mb-2">Write Us:</h2>
          <address>
            <h2 className="font-bold">My Client</h2>
            <p>Road no: #13/C Main Road</p> <p>House no: #12/D First Floor</p>
            <p>Dhanmondi</p>
            <p>Bangladesh, Dhaka-12 </p>
            <p></p>
          </address>
        </div>
      </div>
      <div className="bg-[#012E52] py-4 text-center text-white">
        <span>&copy; 2023 All rights reserved to My Client</span>
      </div>
    </div>
  );
};

export default Footer;
