import express from "express";
import {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    updateProfilePicture,
    forgetPass,
    resetPass,
    postResetPass
  } from "../controllers/userController";
import {authGuard} from "../middlewares/verifyAuthToken"
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authGuard,userProfile);
router.put("/updateProfile", authGuard,updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.put("/forget-password", forgetPass)
router.get("/reset-password/:resetPasswordToken", resetPass)
router.post("/reset-password/:resetPasswordToken",postResetPass)


export default router;