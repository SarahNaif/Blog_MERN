import React,{ useState } from 'react'
import MainLayout from '../../components/navigation/MainLayout'

const CreateArticlePage = () => {
    const [tags, setTags] = useState([])
    function handleKeyDown(e){
        if(e.key !== 'Enter') return
        const value = e.target.value
        if(!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }
    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }
  return (
    <MainLayout>
      <div className="flex flex-col ">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          New Post
        </div>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 p-4 shadow-lg max-w-2xl">
          
          <input
            className="rounded-lg title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellcheck="false"
            placeholder="Title"
            type="text"
          />
          <textarea
            className="rounded-lg bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellcheck="false"
            placeholder="Describe everything about this post here"
          ></textarea>
          <div className="mt-4  ">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              className=" border border-gray-300 w-full mb-4 py-3 bg-[#4B6BFB] bg-opacity-10 rounded-lg outline-none "
              placeholder=" Type Your Tags"
            />
            {tags.map((tag, index) => (
              <div
                className="inline mx-2 mb-4 w-fit rounded-lg bg-[#4B6BFB] text-[#4B6BFB] font-semibold bg-opacity-20 py-1.5 px-2 mb-4"
                key={index}
              >
                <span className="capitalize  ">
                  {tag}{" "}
                  <span className="close" onClick={() => removeTag(index)}>
                    &times;
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="icons flex text-gray-500 mt-8 mx-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>

          <div className="buttons flex justify-end mb-3">
            <div className="btn border border-indigo-500 p-1 px-8 rounded-lg font-semibold cursor-pointer text-gray-200 ml-2 bg-[#4B6BFB]">
              Post
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateArticlePage