import express from "express";
import upload from "../config/multer.js";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  loginUser,
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
router.post("/register", upload.single("ProfileImage"),  registerUser);

// Login a user
router.post("/login", loginUser);

// Update user details
router.post("/profile/update", isAuthenticated, updateUserProfile);

// Update user resume
router.post(
  "/profile/update-resume",
  isAuthenticated,
  upload.single("resume"),
  updateUserResume
);

// Get a user data
router.get("/user", isAuthenticated, getUserData);

// Apply for a job
router.post("/apply", isAuthenticated, applyForJob);

// Get user applied jobs data
router.get("/applications", isAuthenticated, getUserJobApplications);

export default router;
