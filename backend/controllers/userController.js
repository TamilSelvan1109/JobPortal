import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const { name, email, phone, password, role } = req.body;
    const profileImage = req.file;

    if (!name || !email || !phone || !password || !role || !profileImage) {
      return res
        .status(400)
        .json({ success: false, message: "Some details are missing" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(profileImage.path);

    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      image: imageUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        image: newUser.image,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Some details are missing" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    if (role !== user.role) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selected" });
    }

    const tokenData = { userId: user._id };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          image: user.image,
        },
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User logout
export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, phone, bio, skills } = req.body;
    const profileImage = req.file;
    const userData = await User.findById(userId);

    if (profileImage) {
      const imageUpload = await cloudinary.uploader.upload(profileImage.path);
      userData.image = imageUpload.secure_url;
    }
    if (name) userData.name = name;
    if (phone) userData.phone = phone;
    if (bio) userData.profile.bio = bio;
    if (skills)
      userData.profile.skills = skills.split(",").map((skill) => skill.trim());
    await userData.save();

    return res.json({
      success: true,
      message: "Profile Updated",
      user: userData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get the user data
export const getUserData = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.id;
  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job Not Found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await JobApplication.find(userId)
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No job applications found for this user",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.id;
    const resumeFile = req.file;
    const userData = await User.findById(userId);
    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();
    return res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
