import React from "react";


import  images  from "../constantsimages";

const ArticleCard = ({ className, item }) => {
  return (
    <div
    className={`rounded-xl overflow-hidden border py-4 px-4  ${className}`}
    >
      <img
        src={item.image[0]}
        alt="title"
        className="w-full object-cover object-center md:h-48 lg:h-48 xl:h-60 sm:h-52 rounded-md"
      />
      <div className="mt-6">
        <div className="">
        {item.tags.map((tags,key)=>
            <span key={key} className="m-2 capitalize font-light rounded-lg bg-[#4B6BFB] bg-opacity-10 px-2.5 py-1 text-[#4B6BFB] text-sm">
              {tags}
            </span>
             )}
        </div>
        <h2 className="font-roboto font-semibold text-xl text-dark-soft md:text-2xl lg:text-[28px] mt-4">
        {item.title}
        </h2>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={item.image[1]}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-medium text-[#97989F]  text-base">
                {item.author}
              </h4>

            </div>
          </div>
          <span className="font-medium text-[#97989F] italic text-base">
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
