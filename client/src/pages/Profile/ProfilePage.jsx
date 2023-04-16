import React , { useState } from 'react'
import MainLayout from '../../components/navigation/MainLayout'
import ProfilePicture from './content/ProfilePicture'

const ProfilePage = () => {
    const [image, setImage] = useState(null);
    
    const handleImageChange = event => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
      };
    
    const handleImageUpload = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        // Upload the formData to the backend API for processing
      };
    
    

  return (
    <MainLayout>
        <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
<ProfilePicture/>
                  <form>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border "
                 
              />
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border" 
              />
             
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
              
                placeholder="Enter new password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border "
              
              />
            
            </div>
            <button
              type="submit"
              className="bg-[#4B6BFB] text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </form>
          </div>
          </section>

    </MainLayout>
  )
}

export default ProfilePage