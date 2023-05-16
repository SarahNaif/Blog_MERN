import express from "express";
import dotenv from "dotenv";
import path from "path"
import connectDB from "./config/database.js";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;



app.use(express.json());


app.get("/", (_req, res) => {
    res.json({ Message: "am here" });
  });

app.use("/api/users", userRoutes);
// image static folder acess
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(invalidPathHandler);
app.use(errorResponserHandler);

app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`);
  });
  
export default app;