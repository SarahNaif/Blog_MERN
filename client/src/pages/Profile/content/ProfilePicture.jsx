import React , { useState } from 'react'
import images from '../../../data/images';

const ProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage]=useState(null);

  const handleImageChange = event => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage))
  };

  const handleImageUpload = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    // Upload the formData to the backend API for processing
  };

  return (
    <form onSubmit={handleImageUpload}>
    {previewImage ? (<img src={previewImage} class="w-40 h-40 m-auto rounded-full shadow"/>
        ): (<img src={images.PostProfileImage} class="w-40 h-40 m-auto rounded-full shadow"/>)}
    <input
      id="image-upload"
      type="file"
      accept=".jpeg, .png, .jpg"
      onChange={handleImageChange}
    />
    <button type="submit">Upload</button>
  </form>

  )
}

export default ProfilePicture