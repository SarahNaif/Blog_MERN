import express from "express";
const router = express.Router();
import {authGuard, adminGuard} from "../middlewares/verifyAuthToken"
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers/postControllers";

router.post("/", authGuard, adminGuard,createPost);
router.get("/", getAllPosts)
router.put("/:slug", authGuard, adminGuard, updatePost);
router.delete("/:slug", authGuard, adminGuard,deletePost);
router.get("/:slug", getOnePost)

export default router;