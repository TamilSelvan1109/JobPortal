import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowLogin, setIsLogin , userData} = useContext(AppContext);

  return (
<div className="shadow-sm bg-white py-4">
  <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
    {/* --- Logo --- */}
    <h1
      className="text-3xl font-extrabold tracking-tight cursor-pointer"
      onClick={() => navigate("/")}
    >
      <span className="text-blue-900">Spot</span>
      <span className="text-gray-800">Jobs</span>
    </h1>

    {/* --- Right Side (User Section) --- */}
    {userData ? (
      <div className="flex items-center gap-4 text-gray-700 font-medium">
        <Link
          to="/applications"
          className="hover:text-blue-700 transition-none"
        >
          Applied Jobs
        </Link>
        <span className="text-gray-400">|</span>
        <p className="max-sm:hidden">Hi, {userData.name || "User"}</p>
        <Link
          to="/userDashboard"
          className="hover:text-blue-700 transition-none">
          <img className="h-10 w-10 border border-gray-500 rounded-full" src={userData.image} alt="userimage" />
        </Link>
      </div>
    ) : (
      <div className="flex gap-3 max-sm:text-sm">
        {/* Sign Up Button */}
        <button
          onClick={() => {
            setShowLogin(true);
            setIsLogin(false);
          }}
          className="px-5 py-2 border border-blue-900 text-blue-700 font-medium rounded-full cursor-pointer
                     bg-white hover:bg-blue-50"
        >
          Sign Up
        </button>

        {/* Sign In Button */}
        <button
          onClick={() => {
            setShowLogin(true);
            setIsLogin(true);
          }}
          className="px-5 py-2 bg-blue-900 text-white font-medium rounded-full cursor-pointer
                     hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default Navbar;
