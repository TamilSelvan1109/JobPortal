import axios from "axios";
import { use } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const user = null;
  const getToken = null; // Placeholder for token retrieval function

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showLogin, setShowLogin] = useState(false);

  const [isLogin, setIsLogin] = useState(true);

  const [companyToken, setCompanyToken] = useState(null);

  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);

  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/users/user`,{
        withCredentials: true,
      })
      console.log(data);
      
      if(data.success){
        setUserData(data.user);
        console.log(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch company data using token
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
      const initialize = async () => {
          await fetchJobs();
          await fetchUserData(); 
      };
      
      initialize();

      const storedCompanyToken = localStorage.getItem("companyToken");
      if (storedCompanyToken) {
        setCompanyToken(storedCompanyToken);
      }
    }, []);

  useEffect(() => {
      if (companyToken) {
        fetchCompanyData();
      }
  }, [companyToken]);


  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showLogin,
    setShowLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    isLogin,
    setIsLogin,
    fetchUserData,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
