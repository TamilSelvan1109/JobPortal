import moment from "moment";
import { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label
                className="flex items-center cursor-pointer"
                htmlFor="resumeUpload"
              >
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  Select Resume
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img
                  className="cursor-pointer"
                  src={assets.profile_upload_icon}
                  alt=""
                />
              </label>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 text-green-700 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={(e) => setIsEdit(false)}
                className="bg-red-100 border border-red-400 rounded-lg px-4 py-2 text-red-700 cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-5 mt-15">Jobs Apllied</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-5 px-4 text-left text-gray-700 font-medium border-b">
                Company
              </th>
              <th className="py-5 px-4 text-left text-gray-700 font-medium border-b">
                Job Title
              </th>
              <th className="py-5 px-4 text-left text-gray-700 font-medium border-b max-sm:hidden">
                Location
              </th>
              <th className="py-5 px-4 text-left text-gray-700 font-medium border-b max-sm:hidden">
                Date
              </th>
              <th className="py-5 px-4 text-left text-gray-700 font-medium border-b">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img
                      className="w-8 h-8 object-cover"
                      src={job.logo}
                      alt={job.company}
                    />
                    <span className="font-medium text-gray-800">
                      {job.company}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-700">
                    {job.title}
                  </td>
                  <td className="py-3 px-4 border-b max-sm:hidden text-gray-600">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b max-sm:hidden text-gray-600">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        job.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
