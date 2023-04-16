import images from "../data/images"

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5  lg:flex-row h-fit">
    <div className="mt-24 lg:w-1/2 h-fit ">
      <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
        Read the most interesting articles
      </h1>
      <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua
      </p>
      <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
        <div className="relative">
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
            type="text"
            placeholder="Search article"
          />
        </div>
        <button className="w-full bg-[#4B6BFB] text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
          Search
        </button>
      </div>
      <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
        <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
          Popular Tags:
        </span>
        <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
          <li className="rounded-lg bg-[#4B6BFB] bg-opacity-10 px-3 py-1.5 text-[#4B6BFB] font-semibold">
            Design
          </li>
          <li className="rounded-lg bg-[#4B6BFB] bg-opacity-10 px-3 py-1.5 text-[#4B6BFB] font-semibold">
            User Experience
          </li>
          <li className="rounded-lg bg-[#4B6BFB] bg-opacity-10  px-3 py-1.5 text-[#4B6BFB] font-semibold">
            User Interfaces
          </li>
        </ul>
      </div>
    </div>
    <div className="hidden lg:block lg:w-1/2 ">
      <img
        className="w-full h-full"
        src={images.HeroImage}
        alt="users are reading articles"
      />
    </div>
  </section>
  )
}

export default Hero