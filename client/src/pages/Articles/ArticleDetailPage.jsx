import React , {useState}from 'react'
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../../components/navigation/MainLayout"
import images from '../../constants/images'
import { Link, useParams } from 'react-router-dom'
import BreadCrumbs from '../../components/BreadCrumbs'
import SuggestedPosts from '../../components/SuggestedPosts'
import SocialShareButtons from '../../components/SocialShareButtons'
import CommentsContainer from '../../components/comments/CommentsContainer'
import { useSelector } from 'react-redux'
import {getSinglePost, getAllPosts} from "../../services/index/posts"
import ArticleDetailSkeleton from "../../components/ArticleDetailSkeleton"
import ErrorMessaage from "../../components/ErrorMessage"
import stables from "../../constants/stables"
import { generateHTML } from '@tiptap/html'
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser";

const ArticleDetailPage = () => {
  const {slug} = useParams();
  const userState = useSelector((state)=> state.user)
  const [breadCrumbsData , setbreadCrumbsData] = useState([])
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: `${data.title.substring(0,41)}`, link: `/blog/${data.slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
    },onError:()=>{
      
    }
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });



  return (
    <MainLayout>
      {isLoading ? 
    (<ArticleDetailSkeleton/>  )
    : isError ? 
    (<ErrorMessaage/>)
    : (
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
      <article className="flex-1 ">
        <BreadCrumbs data={breadCrumbsData} />
              
        <img
          className="rounded-xl w-full "
          src={
            data?.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
              : images.SamplePostImage
          }
          alt={data?.title}
        />
 {data?.categories.map((category) => (
        <Link
          to="/blog?category=selectedCategory"
          className="text-[#4B6BFB] text-primary text-sm font-roboto inline-block mt-4 md:text-base"
        >
          {category.name}
        </Link>
        ))}
        <h1 className="my-8 text-xl font-medium font-roboto  text-dark-hard md:text-[26px]">
        {data?.title}
        </h1>
        <div className="mt-4 text-dark-soft">
          <div className="leading-7">
            {body}
          </div>
        </div>
        <CommentsContainer 
        className="mt-10" 
        comments={data?.comments}
        logginedUserId={userState?.userInfo?._id}
        postSlug={slug}
        />
      </article>
      <div>
        <SuggestedPosts
          header="Latest Article"
          posts={postsData?.data}
          tags={data?.tags}
          className="mt-8 lg:mt-0 lg:max-w-xs"
        />
        <div className="mt-7">
          <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
            Share on:
          </h2>
          <SocialShareButtons
          url={encodeURI(window.location.href)}
          title={encodeURIComponent(data?.title)}
          />
        </div>
      </div>
    </section>

    )

    }
    
    </MainLayout>
  )
}

export default ArticleDetailPage