import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useSelector } from "react-redux";
import images from "../../../../data/images"
import stables from "../../../../data/stables"
import { getAllPosts , deletePost} from "../../../../services/index/posts";
import Pagination from "../../../../components/Pagination";
const ManagePosts = () => {

  let isFirstRun = true;

  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage),
    queryKey: ["posts"],
  });


  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
  useMutation({
    mutationFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post is deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);


  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
  };



  return (
    <div>
      <h1 className="text-2xl font-semibold mb-16 my-2 text-gray-800 ">
        Mange Posts
      </h1>

      <div className="flex flex-row justify-between w-4/4 mb-1 sm:mb-0 m-5 px-2  md:w-5/6  lg:w-3/4">
        <h2 className="text-2xl leading-tight text-gray-800">Posts</h2>
        <div className="">
          <form 
          onSubmit={submitSearchKeywordHandler}
          className="flex flex-col justify-center w-3/4 max-w-sm space-y-3  lg:w-4/4 md:flex-row md:w-full md:space-x-3 md:space-y-0">
            <div className=" relative ">
              <input
                type="text"
                id='"form-subscribe-Filter'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={searchKeywordHandler}
                value={searchKeyword}
                placeholder="Post title..."
              />
            </div>
            <button
              className="flex-shrink-0 px-5 py-2 text-base font-semibold text-white bg-primary rounded-xl shadow-md "
              type="submit"
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      <div className=" overflow-x-auto  rounded-lg border border-gray-200 shadow-md m-5">
        <table className="overflow-x-auto  w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Category
              </th>
              <th scope="col"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Created At
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Tags
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
            {isLoading || isFetching ? (
              <tr  className="">
                <td colSpan={5} className="text-center py-10 w-4/4">
                  Loading...
                </td>
              </tr>
            ) : postsData?.data?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 w-full text-red-900">
                  No posts found
                </td>
              </tr>
            ) : (
              postsData?.data.map((post, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <th className=" flex md:flex sm:flex items-center sm:flex-col lg:flex-row gap-3 pl-6 py-4 font-normal text-gray-900">
                    <div className=" h-10 w-20 ">
                      <img
                        className="h-full w-full rounded-xl object-cover object-center"
                        src={
                          post?.photo
                            ? stables.UPLOAD_FOLDER_BASE_URL +
                              post?.photo 
                            : images.SamplePostImage
                        }
                        alt="post image"
                      />
                    </div>
                    <div className="py-3 ">
                      <div className="font-medium text-gray-700">
                        {post.title}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <span className={`inline-flex whitespace-no-wrap items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold   ${post.categories.length > 0 ? `text-green-600 bg-green-50`: `text-slate-800 bg-gray-100`}`}>
                      <span className={`h-1.5 w-1.5 rounded-full  ${post.categories.length > 0 ? `bg-green-600`: `bg-gray-600`}`}></span>
                            {post.categories.length > 0
                              ? post.categories[0]
                              : "Uncategorized"}
                          
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap"> {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                      {post.tags.length > 0
                              ? post.tags.map((tag, index) => (
                                  <p key={index} className={`inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 m-1 text-xs font-semibold ${post.tags.length > 0 ? `text-blue-600 bg-blue-50`: `text-slate-800 bg-gray-100` } `}>
                                    {tag}
                                   
                                  </p>
                                ))
                              : "No tags"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button 
                       disabled={isLoadingDeletePost}
                      type="button"
                      onClick={() => {
                        deletePostHandler({
                          slug: post?.slug,
                          token: userState.userInfo.token,
                        });
                      }}
                      className="disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <HiOutlineTrash className="h-7 w-6 stroke-red-500 " />
                      </button>
                      <button x-data="{ tooltip: 'Delete' }" href="#">
                        <HiOutlinePencil className="h-7 w-6 stroke-yellow-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
 {!isLoading && (
        <Pagination 
        onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    postsData?.headers?.["x-totalpagecount"]
                  )}
        />
 )}
      </div>
    </div>
  );
}

export default ManagePosts