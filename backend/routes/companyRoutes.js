import express from "express";
import upload from "../config/multer.js";
import {
  changeJobApllicationStatus,
  changeJobVisiblty,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  postJob,
} from "../controllers/companyController.js";
import { isAuthenticated} from "../middleware/authMiddleware.js";

const router = express.Router();

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
