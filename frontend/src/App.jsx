import "quill/dist/quill.snow.css";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";

import Loading from "./components/Loading";
import LoginRegister from "./components/LoginRegister";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ManageJobs from "./pages/ManageJobs";
import UpdateUser from "./pages/UpdateUser";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import ViewApplications from "./pages/ViewApplications";
import JobApplicants from "./pages/JobApplicants";

const App = () => {
  const { showLogin, setShowLogin, userData, companyData, isLoading } =
    useContext(AppContext);

  return isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <div>
      {showLogin && <LoginRegister onClose={() => setShowLogin(false)} />}

      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />

        {/* User Routes */}
        {userData ? (
          <Route path="/user" element={<UserDashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="edit" element={<UpdateUser />} />
            <Route path="applications" element={<Applications />} />
          </Route>
        ) : (
          <Route path="/user/*" element={<Navigate to="/" />} />
        )}

        {/* Recruiter (Company) Routes */}
        {companyData ? (
          <Route path="/recruiter" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
            <Route path="job-applicants/:jobId" element={<JobApplicants />} />
          </Route>
        ) : (
          <Route path="/recruiter/*" element={<Navigate to="/" />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
