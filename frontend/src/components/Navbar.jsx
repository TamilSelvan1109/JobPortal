import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowLogin } = useContext(AppContext);
  const user = null; // Placeholder for user authentication status

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <h1
          className="text-3xl font-extrabold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-blue-900">Spot</span>
          <span className="text-black">Jobs</span>
        </h1>
        {user ? (
          <div className="flex items-center gap-3">
            <Link to={"/applications"}>Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden">Hi,</p>
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-sm">
            <button
              onClick={(e) => setShowLogin(true)}
              className="text-gray-600  cursor-pointer"
            >
              Register User
            </button>
            <button className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full  cursor-pointer">
              User Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
