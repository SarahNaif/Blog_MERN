import React from 'react'
import MainLayout from '../../components/navigation/MainLayout'
import images from '../../data/images';
import articleData from '../../data/articlesdata';
import ArticleCard from '../../components/ArticleCard';


const ArticlesPage = () => {
  return (
    <MainLayout>
      <div className=" mb-16 mx-6">
        <div className="border-b-2 border-gray-300 py-8">
          <h1 className=" uppercase text-3xl font-semibold">Latest</h1>
        </div>
        <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 gap-4     [&>*:first-child]:lg:flex  [&>*:first-child]:lg:items-center [&>*:first-child]:lg:space-x-7     ">
          {articleData.map((item, index) => (
            <ArticleCard
              item={item}
              key={index}
              className={"lg:col-span-" + (index % 4 === 0 ? "3 lg:flex lg:items-center lg:space-x-7 [&>_img]:lg:h-68 [&>_img]:lg:w-3/4" : "1") + ""}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default ArticlesPage
