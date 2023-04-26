import express from "express";
import {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    updateProfilePicture,
  } from "../controllers/userController";
import {authGuard} from "../middlewares/verifyAuthToken"
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authGuard,userProfile);
router.put("/updateProfile", authGuard,updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);


export default router;