import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
// Routes
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

app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`);
  });
  
export default app;