import { Link } from "react-router-dom";
import headerNavLinks from "../data/headerNavLinks"
import images from "../data/images"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <section className=" ">
      <nav className="flex bg-white text-gray-700 items-center">
        <div className=" mx-auto  px-5 xl:px-12 py-6 flex w-full items-center justify-between">
          <img className="w-30" src={images.Logo} alt="logo" />

          <ul className="hidden  md:flex px-4 mx-auto font-semibold font-heading space-x-12">
            {headerNavLinks.map((item)=>(<Link key={item.name} href={item.href}>
              {item.name}</Link>))}
          </ul>

          <div className="flex items-center gap-2 ">
            <Link className="px-2 text-gray-600 font-semibold ">
              Sign in
            </Link>
            <MobileNav/>
          </div>

         

        </div>
      </nav>
    </section>
  );
}

export default Header