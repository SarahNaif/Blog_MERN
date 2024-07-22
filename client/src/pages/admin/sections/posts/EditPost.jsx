import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import ErrorMessage from "../../../../components/ErrorMessage";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import ArticleDetailSkeleton from "../../../../components/ArticleDetailSkeleton";
import Editor from "../../../../components/editor/Editor";
import { HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { stables } from '../../../../constants/stables';
import MultiSelectTagDropdown from "../../content/drop-down/MultiSelectTagDropdown"
import { getAllCategories } from "../../../../services/index/postCategories";
import { categoryToOption, filterCategories} from "../../../../utils/multiSelectTagUtils";
const EditPost = () => {

    const { slug } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    const [initialPhoto, setInitialPhoto] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [body, setBody] = useState(null);
    const [categories, setCategories] = useState(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState(null);
    const [postSlug, setPostSlug] = useState(slug);
    const [caption, setCaption] = useState("");

    const promiseOptions = async (inputValue) => {
      const { data: categoriesData } = await getAllCategories();
      return filterCategories(inputValue, categoriesData);
    };
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            setInitialPhoto(data?.photo);
            setCategories(data.categories.map((item) => item._id));
            setTitle(data.title);
            setTags(data.tags);
        },
        refetchOnWindowFocus: false,
    } );
       

    const {
        mutate: mutateUpdatePostDetail,
        isLoading: isLoadingUpdatePostDetail,
      } = useMutation({
        mutationFn: ({ updatedData, slug, token }) => {
          return updatePost({
            updatedData,
            slug,
            token,
          });
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["blog", slug]);
          toast.success("Post is updated");
          navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
        },
        onError: (error) => {
          toast.error(error.message);
          console.log(error);
        },
      });
  

   

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setPhoto(file);
    };

    const handleDeleteImage = () => {
      if (window.confirm("Do you want to delete your Post picture?")) {
        setInitialPhoto(null);
        setPhoto(null);
      }
    };


    const handleUpdatePost = async () => {
      let updatedData = new FormData();
  
      if (!initialPhoto && photo) {
        updatedData.append("postPicture", photo);
      } else if (initialPhoto && !photo) {
        const urlToObject = async (url) => {
          let reponse = await fetch(url);
          let blob = await reponse.blob();
          const file = new File([blob], initialPhoto, { type: blob.type });
          return file;
        };
        const picture = await urlToObject(
          stables.UPLOAD_FOLDER_BASE_URL + data?.photo
        );
  
        updatedData.append("postPicture", picture);
      }
  
      updatedData.append(
        "document",
        JSON.stringify({ body, categories, title, tags, slug: postSlug, caption })
      );
  
      mutateUpdatePostDetail({
        updatedData,
        slug,
        token: userState.userInfo.token,
      });
    };


    let isPostDataLoaded = !isLoading && !isError;

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post edit" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start bg-white mb-14">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : (
         
                <div className="relative order-first md:order-last min-h-[300px] md:h-auto flex justify-center items-center border border-2 border-dashed border-blue-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                    <span className="text-blue-400 opacity-75">
                        <svg className="w-24 h-24 text-blue-400"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    </span>
            </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <div className="flex justify-end">
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded px-4 py-2 mt-5"
            >
              <div className="flex content-center gap-2">
              <HiOutlineTrash size={20}/>
              <span>Delete Image</span>
              </div>
              
              
            </button>
            </div>
           
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="d-label" htmlFor="title">
                <span className="d-label-text">Title</span>
              </label>
              <input
                id="title"
                value={title}
                className="rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <div className="flex flex-col">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">Caption</span>
              </label>
              <input
                id="caption"
                value={caption}
                className="rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
              />
            </div>
            <div className="flex flex-col">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">Slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="post slug"
              />
            </div>
            <div className="mb-5 mt-2">
              <label className="d-label">
                <span className="d-label-text">Categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)}
                  onChange={(newValue) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>
            {/* <div className="mb-5 mt-2">
              <label className="d-label">
                <span className="d-label-text">Tags</span>
              </label>
              {/* {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data.tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                  className="relative z-20"
                />
              )} 
            </div> */}
            <div className="w-full mt-5 mb-5 border border-slate-300 rounded-lg  sticky top-3 left-0 right-0 bg-white z-10 flex gap-0.5 flex-wrap">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  )
}

export default EditPost