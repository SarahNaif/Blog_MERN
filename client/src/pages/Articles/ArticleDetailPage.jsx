import React from 'react'
import MainLayout from "../../components/navigation/MainLayout"
import images from '../../data/images'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import breadCrumbsData from '../../data/breadCrumbsData'
import SuggestedPosts from '../../components/SuggestedPosts'
import articleData from '../../data/articlesdata'
import  tagsData  from '../../data/tags'
import SocialShareButtons from '../../components/SocialShareButtons'
import CommentsContainer from '../../components/comments/CommentsContainer'
const ArticleDetailPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1 ">
          <BreadCrumbs data={breadCrumbsData} />
                
          <img
            className="rounded-xl w-full h-72"
            src={images.PostImage}
            alt="laptop"
          />

          <Link
            to="/blog?category=selectedCategory"
            className="text-[#4B6BFB] text-primary text-sm font-roboto inline-block mt-4 md:text-base"
          >
            EDUCATION
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Help children get better education
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque. In egestas erat
              imperdiet sed euismod nisi porta lorem mollis. Morbi tristique
              senectus et netus. Mattis pellentesque id nibh tortor id aliquet
              lectus proin.
            </p>
          </div>
          <CommentsContainer className="mt-10" logginedUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Latest Article"
            posts={articleData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            <SocialShareButtons
              url={encodeURI(
                "https://moonfo.com/post/client-side-and-server-side-explanation"
              )}
              title={encodeURIComponent(
                "Client-side and Server-side explanation"
              )}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ArticleDetailPage