import "quill/dist/quill.snow.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import AddJob from "./pages/AddJob";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegister from "./components/LoginRegister";
import UserDashboard from "./pages/UserDashboard";
import UpdateUser from "./pages/UpdateUser";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const { showLogin , companyToken, setShowLogin, userData} = useContext(AppContext);
  return (
    <div>
      {showLogin && <LoginRegister onClose={() => setShowLogin(false)} />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/userDashboard" element={<UserDashboard />} >
        {userData ? <>
          <Route path="profile" element={<UserProfile />} />
          <Route path="editUser" element={<UpdateUser />} />
        </> : null}
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        {companyToken ? <>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </> : null}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
