import axios from "axios";
import { useContext, useState } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { AuthContext } from "../context/AuthContext";
=======
import { AppContext } from "../context/AppContext";
>>>>>>> 0391c8a (user and company register done)
=======
import { AppContext } from "../context/AppContext";
>>>>>>> 0391c8a660681a763f3c968e01f170e4dd1d4420

const UserRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log("User logined:", res.data);
      } else {
        // REGISTER
        const role = isCompany ? "company" : "user";
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          phone,
          password,
          role,
        });
        console.log("User registered:", res.data);
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        alert(`❌ ${err.response.data.message || "Request failed."}`);
      } else {
        alert("⚠️ Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setIsCompany(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isCompany"
                checked={isCompany}
                onChange={(e) => setIsCompany(e.target.checked)}
              />
              <label htmlFor="isCompany" className="text-gray-700">
                Register as a Company
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white font-semibold rounded-lg py-2 hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
