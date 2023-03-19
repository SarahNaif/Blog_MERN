import React from 'react'
import ArticleCard from './ArticleCard'


const Articles = () => {
  return (
    <section className="flex flex-col container mx-auto px-5 py-4">
      <div className='my-8'>
      <span className="text-2xl font-bold text-neutral-900">Latest Post</span>
      </div>
    <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
     <ArticleCard  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
     <ArticleCard  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
     <ArticleCard  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
     <ArticleCard  className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />

    </div>
    <button className=" mx-auto flex items-center gap-x-2 font-bold text-[#4B6BFB] border-2 border-[#4B6BFB] px-6 py-3 rounded-lg">
      <span>More articles</span>
      
    </button>

  </section>
  )
}

export default Articles