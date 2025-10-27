import {
  Briefcase,
  Calendar,
  FileText,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  Tags,
} from "lucide-react";
import moment from "moment";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const UserProfile = () => {
  const { userData, jobsApplied } = useContext(AppContext);
  const navigate = useNavigate();

  // Get the latest 4 applied jobs
  const latestJobs = jobsApplied ? [...jobsApplied].reverse().slice(0, 4) : [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 flex flex-col gap-8 mb-10">
      {/* --- Profile Card --- */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* LEFT: Avatar & Name */}
          <div className="flex flex-col items-center text-center md:w-1/3">
            <img
              src={userData.image}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800 break-words">
              {userData.name}
            </h2>
            <p className="text-lg text-gray-500 mt-1">
              {userData.profile.role !== ""
                ? userData.profile.role
                : userData.role}
            </p>
          </div>

          {/* RIGHT: User Info */}
          <div className="flex-1 w-full space-y-10 md:border-l md:pl-10 border-gray-200">
            {/* About */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 pb-2 border-b flex items-center gap-3">
                <NotebookPen size={22} className="text-blue-600" />
                About
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {userData.profile.bio
                  ? userData.profile.bio
                  : "No bio provided."}
              </p>
            </section>

            {/* Contact Info */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-3">
                <Phone size={22} className="text-blue-600" />
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 break-all">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Email</p>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Phone</p>
                    <p className="font-medium text-gray-900">
                      {userData.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Resume */}
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 sm:col-span-2">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      Resume
                    </p>
                    {userData.profile.resume ? (
                      <a
                        href={userData.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                      >
                        View Resume
                      </a>
                    ) : (
                      <p className="text-gray-500">Not uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-3">
                <Tags size={22} className="text-blue-600" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.profile.skills.length > 0 ? (
                  userData.profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-200 transition"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* --- Recent Applications --- */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b flex items-center gap-3">
          <Briefcase size={22} className="text-blue-600" />
          Recent Applications
        </h3>

        {latestJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {latestJobs.map((job, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-gray-50 hover:bg-gray-100 transition"
              >
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover border"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {job.title}
                  </h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin size={15} className="text-blue-600" />
                    {job.location}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar size={15} className="text-blue-600" />
                    {moment(job.date).format("MMM DD, YYYY")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : job.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : job.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {job.status}
                  </span>
                  <button
                    onClick={() => navigate(`/apply-job/${job.jobId}`)}
                    className="text-blue-600 underline text-sm font-medium cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600 text-center py-10">
            No recent applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
