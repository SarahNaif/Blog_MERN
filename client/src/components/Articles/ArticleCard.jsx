import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {Link} from "react-router-dom"
import stables from "../../data/stables"
import  images  from "../../data/images";

const ArticleCard = ({ className, item }) => {
  
  return (
    <>
    <div
    className={`rounded-xl overflow-hidden border py-4 px-4  ${className}`}
    
    >
      <Link to={`/post/${item.slug}`}>
      <img
        src={
            item.photo ? stables.UPLOAD_FOLDER_BASE_URL + item.photo
              : images.SamplePostImage
          }
        alt="title"
        className="w-full object-cover object-center md:h-48 lg:h-48 xl:h-60 sm:h-52 rounded-md"
      />
      </Link>
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
             src={
              item.user.avatar
                ? stables.UPLOAD_FOLDER_BASE_URL + item.user.avatar
                : images.PostProfileImage
            }
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                {item.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${
                    item.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                  } w-fit bg-opacity-20 p-1.5 rounded-full`}
                >
                  {item.user.verified ? (
                    <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="w-1.5 h-1.5 text-red-500" />
                  )}
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  {item.user.verified ? "Verified" : "Unverified"} writer
                </span>
              </div>

            </div>
          </div>
          <span className="font-medium text-[#97989F] italic text-base">
            {new Date(item.createdAt).toLocaleString('en-US',{day:'2-digit',month:'short',year: "numeric",})}
          </span>
        </div>
      </div>
    </div>


</>
  );
};

export default ArticleCard;
