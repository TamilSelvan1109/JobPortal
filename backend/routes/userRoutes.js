import express from "express";
import upload from "../config/multer.js";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  loginUser,
<<<<<<< HEAD
=======
  logoutUser,
>>>>>>> 0391c8a (user and company register done)
  registerUser,
  updateUserProfile,
  updateUserResume,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const uploadResume = multer({ storage: storage });

// Register a user
<<<<<<< HEAD
router.post("/register", upload.single("ProfileImage"),  registerUser);
=======
router.post("/register", upload.single("image"),  registerUser);
>>>>>>> 0391c8a (user and company register done)

// Login a user
router.post("/login", loginUser);

// Update user details
<<<<<<< HEAD
router.post("/profile/update", isAuthenticated, updateUserProfile);

// Update user resume
router.post(
=======
router.post("/profile/update",upload.single("image"), isAuthenticated, updateUserProfile);

// Update user resume
router.patch(
>>>>>>> 0391c8a (user and company register done)
  "/profile/update-resume",
  isAuthenticated,
  upload.single("resume"),
  updateUserResume
);

<<<<<<< HEAD
=======
router.get("/logout", isAuthenticated, logoutUser)

>>>>>>> 0391c8a (user and company register done)
// Get a user data
router.get("/user", isAuthenticated, getUserData);

// Apply for a job
router.post("/apply", isAuthenticated, applyForJob);

// Get user applied jobs data
router.get("/applications", isAuthenticated, getUserJobApplications);

export default router;
