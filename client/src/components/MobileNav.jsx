import { useState } from 'react';
import { Link } from "react-router-dom";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import headerNavLinks from "../data/headerNavLinks"

const MobileNav = () => {
    const [navShow, setNavShow] = useState(false);

    const onToggleNav = () => {

        setNavShow((status) => {
          if (status) {
            document.body.style.overflow = 'auto';
          } else {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
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
          <MdOutlineClose className='w-9 h-9'/>
        ) : (

<MdOutlineMenu className='w-9 h-9'/>
        )}
      
    </button>
    <div
      className={`fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300 ${
        navShow ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        type="button"
        aria-label="toggle modal"
        className="fixed w-full h-full cursor-auto focus:outline-none"
        onClick={onToggleNav}
      ></button>
      <nav className="fixed h-full mt-8">
        {headerNavLinks.map((link) => (
          <div key={link.name} className="px-12 py-4">
            <Link
              href={link.href}
              className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
              onClick={onToggleNav}
            >
              {link.name}
            </Link>
          </div>
        ))}

      </nav>
    </div>
  </div>
  )
}

export default MobileNav