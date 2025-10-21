import mongoose, { skipMiddlewareFunction } from "mongoose";

const userSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    _id: {
      type: String,
      required: true,
    },
=======
>>>>>>> 0391c8a (user and company register done)
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
      enum: ["user", "company"],
=======
      enum: ["User", "Recruiter"],
>>>>>>> 0391c8a (user and company register done)
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
