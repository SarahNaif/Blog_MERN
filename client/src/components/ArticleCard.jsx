import React from "react";


import  images  from "../data/images";

const ArticleCard = ({ className }) => {
  return (
    <div
    className={`rounded-xl overflow-hidden border py-4 px-4  ${className}`}
    >
      <img
        src={images.PostImage}
        alt="title"
        className="w-full object-cover object-center md:h-48 lg:h-48 xl:h-60 sm:h-52 rounded-md"
      />
      <div className="mt-6">
        <div className="">
            <span className="font-light rounded-lg bg-[#4B6BFB] bg-opacity-10 px-2.5 py-1 text-[#4B6BFB] text-sm">
                Technology
            </span>
        </div>
        <h2 className="font-roboto font-semibold text-xl text-dark-soft md:text-2xl lg:text-[28px] mt-4">
        The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={images.PostProfileImage}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-medium text-[#97989F]  text-base">
                Viola Manisa
              </h4>

            </div>
          </div>
          <span className="font-medium text-[#97989F] italic text-base">
            02 May
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
