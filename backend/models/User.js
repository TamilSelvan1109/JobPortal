import mongoose, { skipMiddlewareFunction } from "mongoose";

const userSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
<<<<<<< HEAD
    _id: {
      type: String,
      required: true,
    },
=======
>>>>>>> 0391c8a (user and company register done)
=======
>>>>>>> 0391c8a660681a763f3c968e01f170e4dd1d4420
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone:{
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
<<<<<<< HEAD
<<<<<<< HEAD
      enum: ["user", "company"],
=======
      enum: ["User", "Recruiter"],
>>>>>>> 0391c8a (user and company register done)
=======
      enum: ["User", "Recruiter"],
>>>>>>> 0391c8a660681a763f3c968e01f170e4dd1d4420
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    profile:{
      bio: { type: String, default: "" },
      skills: { type: [String], default: [] },
      resume: { type: String, default: "" },
      company:{type:mongoose.Schema.Types.ObjectId, ref:"Company", default:null},
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
