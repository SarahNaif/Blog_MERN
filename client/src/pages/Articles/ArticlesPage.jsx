import React from 'react'
import {useQuery} from "@tanstack/react-query"
import { getAllPosts } from '../../services/index/posts'

import MainLayout from '../../components/navigation/MainLayout'
import ArticleCard from '../../components/Articles/ArticleCard';
import ErrorMessage from '../../components/ErrorMessage'
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton'


const ArticlesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return (
    <MainLayout>
      <div className=" mb-16 mx-6">
        <div className="border-b-2 border-gray-300 py-8">
          <h1 className=" uppercase text-3xl font-semibold">Latest</h1>
        </div>
        <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 gap-4     [&>*:first-child]:lg:flex  [&>*:first-child]:lg:items-center [&>*:first-child]:lg:space-x-7     ">
           {isLoading ? (
          [...Array(3)].map(( item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
          data.data.map((post, index) => (
            <ArticleCard
              key={post._id}
              item={post}
              className={"lg:col-span-" + (index % 4 === 0 ? "3 lg:flex lg:items-center lg:space-x-7 [&>_img]:lg:h-72 [&>_img]:lg:w-3/4" : "1") + ""}
            />
          ))
        )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ArticlesPage
