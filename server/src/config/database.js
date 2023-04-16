import mongoose from "mongoose";


const connectDB = async () => {

  await mongoose.connect(process.env.DB_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB Connection Error =>', err))
};
  
  export default connectDB;

