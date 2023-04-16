import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import headerNavLinks from "../../data/headerNavLinks"
import { MdKeyboardArrowDown } from "react-icons/md";
import {RxExit} from "react-icons/rx"
import { HiOutlinePencilAlt } from "react-icons/hi";
import images from "../../data/images"
import MobileNav from "../MobileNav"
import { useNavigate } from "react-router-dom";

const Header = ({logginedUserId}) => {
  const navigate = useNavigate();
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);
  const isUserLoggined = Boolean(logginedUserId);


  return (
    <section className=" shadow-sm">
      <nav className="flex bg-white text-gray-700 items-center ">
        <div className=" mx-auto  px-5 xl:px-12 py-6 flex w-full items-center justify-between">
          <img className="w-30 " src={images.Logo} alt="logo" />

          <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            {headerNavLinks.map((item)=>(<li key={item.name}><Link to={item.href}>
              {item.name}</Link></li>))}
          </ul>

          <div className="flex items-center gap-2 ">
           
          
          {isUserLoggined ? (
            <div className="text-blue-500 items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
  
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex gap-x-1 items-center mt-5 md:mt-0 lg:mt-0  px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown/>
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500  absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max`}
                  >
                    <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="hover:bg-dark-hard hover:text-[#636363] px-4 py-2 text-[#4B6BFB] lg:text-dark-soft"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={() => navigate("/new")}
                        type="button"
                        className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363] px-4 py-2 text-[#4B6BFB] lg:text-dark-soft"
                      > <HiOutlinePencilAlt/>
                        Write Post
                      </button>
                      <button
                        
                        type="button"
                        className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363] px-4 py-2 text-[#4B6BFB] lg:text-dark-soft"
                      >
                        <RxExit/>
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Sign in
            </button>
          )}
           <MobileNav/>
</div>
         

        </div>
      </nav>
    </section>
  );
}

export default Header