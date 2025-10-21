// Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
<<<<<<< HEAD
  contactEmail: { type: String, required: true }, 
  image: { type: String, required: true },
=======
  contactEmail: { type: String, required: true, default:"" }, 
  image: { type: String, required: true, default:"" }, 
>>>>>>> 0391c8a (user and company register done)
=======
  contactEmail: { type: String, required: true, default:"" }, 
  image: { type: String, required: true, default:"" }, 
>>>>>>> 0391c8a660681a763f3c968e01f170e4dd1d4420
  description: { type: String, default: "" },
  website: { type: String, default: "" },
  location: { type: String, default: "" },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;