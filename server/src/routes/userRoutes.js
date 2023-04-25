import express from "express";
import {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
  } from "../controllers/userController";

const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",userProfile);
router.put("/updateProfile", updateProfile);


export default router;