import {useState, useEffect}from 'react'
import {useQuery} from "@tanstack/react-query"
import { getAllPosts } from '../../services/index/posts'

import ErrorMessage from '../ErrorMessage'
import ArticleCardSkeleton from '../ArticleCardSkeleton'
import ArticleCard from './ArticleCard'




const Articles = () => {

  const [articles, setArticles] = useState(3);


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="flex flex-col container mx-auto px-5 py-4">
      <div className="my-8">
        <span className="text-2xl font-bold text-neutral-900">Latest Post</span>
      </div>
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
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
          data?.data.slice(0,articles).map((post) => (
            <ArticleCard
              key={post._id}
              item={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        )}

      </div>


        <button
          onClick={() => setArticles(articles + 3)}
          className=" mx-auto flex items-center gap-x-2 font-bold text-[#4B6BFB] border-2 border-[#4B6BFB] px-6 py-3 rounded-lg"
        >
          <span>More articles</span>
        </button>

    </section>
  );
}

export default Articles