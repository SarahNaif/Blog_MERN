import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";

import headerNavLinks from "../../data/headerNavLinks";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/user";

const MobileNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navShow, setNavShow] = useState(false);
  const userState = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div className="md:hidden ">
      <button
        type="button"
        className=" py-1 mx-4 mt-4 rounded text-blue-500"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        {navShow ? (
          <MdOutlineClose className="w-9 h-9" />
        ) : (
          <MdOutlineMenu className="w-9 h-9" />
        )}
      </button>
      <div
        className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed w-full h-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed h-full mt-8 ">
          {headerNavLinks.map((link) => (
            <div key={link.name} className="px-12 py-4">
              <button
                onClick={() => navigate(link.href)}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
              >
                {link.name}
              </button>
            </div>
          ))}

          <div className=" ">
            {userState.userInfo ? (
              <div className="space-y-7 px-12 py-4 text-left text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
                <button
                 type="button"
                  onClick={() => navigate("/profile")}
                  className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363]"
                >
                  Profile Page
                </button>
                <button
                 type="button"
                  onClick={() => navigate("/new")}
                  className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363]"
                >
                  Write Post
                </button>
                <button
                 type="button"
                  onClick={logoutHandler}
                  className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-12 py-4 text-left text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
              <button
                onClick={() => navigate("/register")}
                className="flex gap-2 items-center hover:bg-dark-hard hover:text-[#636363]"
              >
                Sign Up
              </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
