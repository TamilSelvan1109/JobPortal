import express from "express";
import upload from "../config/multer.js";
import {
  changeJobApllicationStatus,
  changeJobVisiblty,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
<<<<<<< HEAD
  loginCompany,
  postJob,
  registerCompany,
=======
  postJob,
>>>>>>> 0391c8a (user and company register done)
} from "../controllers/companyController.js";
import { isAuthenticated} from "../middleware/authMiddleware.js";

const router = express.Router();

<<<<<<< HEAD
// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company login
router.post("/login", loginCompany);

=======
>>>>>>> 0391c8a (user and company register done)
// Get company data
router.get("/company", isAuthenticated, getCompanyData);

// Post a job
router.post("/post-job", isAuthenticated, postJob);

// Get applicants data of company
router.get("/applicants", isAuthenticated, getCompanyJobApplicants);

// Get company job list
router.get("/list-jobs", isAuthenticated, getCompanyPostedJobs);

// Change application status
router.post("/change-status", isAuthenticated, changeJobApllicationStatus);

// Change application visiblity
router.post("/change-visiblity", isAuthenticated, changeJobVisiblty);

export default router;
