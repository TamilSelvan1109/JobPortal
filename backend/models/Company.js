// Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true }, 
  image: { type: String, required: true },
  description: { type: String, default: "" },
  website: { type: String, default: "" },
  location: { type: String, default: "" },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company;