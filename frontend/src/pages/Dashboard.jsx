import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4">
        <div className="px-5 flex justify-between items-center">
          <h1
            className="text-3xl font-extrabold cursor-pointer max-sm:w-32"
            onClick={() => navigate("/")}
          >
            <span className="text-blue-900">Spot</span>
            <span className="text-black">Jobs</span>
          </h1>

          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, thalaiva</p>

            <div className="relative group">
              <img
                className="w-8 rounded-full"
                src={assets.company_icon}
                alt=""
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white border border-gray-400 rounded-md text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-5">Logout</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* left sidebar with options to add job, manage job, view application */}
        
        <div className="inline-block min-h-screen border-r-2 border-gray-400">
          <ul className="flex flex-col items-start pt-1 text-gray-800">
            <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && `bg-blue-100 border-r-4 border-blue-900`}`} to={'/dashboard/add-job'}>
            <img className="min-w-4" src={assets.add_icon} alt="" />
            <p className="max-sm:hidden" >Add Job</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && `bg-blue-100 border-r-4 border-blue-900`}`} to={'/dashboard/manage-jobs'}>
            <img className="min-w-4" src={assets.home_icon} alt="" />
            <p className="max-sm:hidden" >Manage Jobs</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && `bg-blue-100 border-r-4 border-blue-900`}`} to={'/dashboard/view-applications'}>
            <img className="min-w-4" src={assets.person_tick_icon} alt="" />
            <p className="max-sm:hidden" >View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
