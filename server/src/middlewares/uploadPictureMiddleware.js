import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });


  const uploadPicture = multer({
    storage: storage,
    limits: {
      fileSize: 1 * 1000000,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
      }
    },
  });





  export default  uploadPicture ;
