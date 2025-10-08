import express from "express";
import upload from "../config/multer.js";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";

const router = express.Router();

// Get a user data
router.get("/user", getUserData);

// Apply for a job
router.post("/apply", applyForJob);

// Get user applied jobs data
router.get("/applications", getUserJobApplications);

// Update user profile (resume)
router.post("/updateResume", upload.single("resume"), updateUserResume);

export default router;
