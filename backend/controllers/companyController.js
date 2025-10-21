import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";


// Get company data
export const getCompanyData = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    const company = await Company.findById(user.profile.company);
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const userId = req.id;
  const user = await User.findById(userId);
  const company = await Company.findOne( user.profile.company );
  console.log(company);
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId: company._id,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();
    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    const company = await Company.findById(user.profile.company);
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    console.log(company);
    
    const jobs = await Job.find({companyId:company._id});
    // Adding No of Applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ JobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change job application status
export const changeJobApllicationStatus = async (req, res) => {};

// Change job visibility
export const changeJobVisiblty = async (req, res) => {
  try {
    const  data  = req;
    console.log(data);
    const companyId = req.company._id;
    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
