import axios from "axios";
import {
  Building,
  Camera,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

// Redesigned InputField to accept an icon
const InputField = ({ icon, ...props }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="bg-sky-50 border-2 border-sky-200 rounded-lg pl-12 pr-4 py-3 w-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  </div>
);

const LoginRegister = ({ onClose }) => {
  // Accept the onClose prop
  // UI State
  const [loading, setLoading] = useState(false);

  // Form Data State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const { backendUrl, setUserData, setShowLogin, isLogin, setIsLogin } =
    useContext(AppContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const loginPayload = { email, password, role };
        const res = await axios.post(
          `${backendUrl}/api/Users/login`,
          loginPayload,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setUserData(res.data.user);
          toast.success("Logged in successfully!");
          onClose();
        } else {
          toast.error(res.data.message || "Login failed. Please try again.");
        }
      } else {
        // --- REGISTER LOGIC ---
        if (!name || !email || !phone || !password || !role || !image) {
          toast.error("Please fill all the fields and upload an image!");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("image", image);

        await axios.post(`${backendUrl}/api/Users/register`, formData, {
          withCredentials: true,
        });

        // REPLACED alert with toast
        toast.success("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      // REPLACED alert with toast
      toast.error(errorMessage);
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
    setRole("User");
    setImage(null);
    setImagePreview("");
  };

  const loginForm = (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center text-sky-800 mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-600 mb-8">Sign in to continue.</p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          icon={<Mail size={18} className="text-gray-400" />}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          icon={<LockKeyhole size={18} className="text-gray-400" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setRole("User")}
            className={`py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              role === "User"
                ? "bg-sky-700 text-white"
                : "bg-sky-100 text-sky-800"
            }`}
          >
            <User size={18} /> User
          </button>
          <button
            type="button"
            onClick={() => setRole("Recruiter")}
            className={`py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              role === "Recruiter"
                ? "bg-sky-700 text-white"
                : "bg-sky-100 text-sky-800"
            }`}
          >
            <Building size={18} /> Recruiter
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white font-bold rounded-lg py-3 mt-4 hover:bg-blue-700 flex items-center justify-center gap-2 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );

  const registerForm = (
    <div className="w-full grid md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-sky-800 mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600 mb-6">
          Join our community of professionals.
        </p>
        <label htmlFor="profileImage" className="cursor-pointer mb-6">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-sky-300 flex items-center justify-center bg-sky-50 text-sky-600 hover:bg-sky-100 transition relative overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Camera size={40} className="text-gray-400" />
            )}
          </div>
        </label>
        <input
          type="file"
          id="profileImage"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <div className="w-full max-w-xs grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("User")}
            className={`py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              role === "User"
                ? "bg-sky-700 text-white"
                : "bg-sky-100 text-sky-800"
            }`}
          >
            <User size={18} /> User
          </button>
          <button
            type="button"
            onClick={() => setRole("Recruiter")}
            className={`py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              role === "Recruiter"
                ? "bg-sky-700 text-white"
                : "bg-sky-100 text-sky-800"
            }`}
          >
            <Building size={18} /> Recruiter
          </button>
        </div>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          icon={
            role === "Recruiter" ? (
              <Building size={18} className="text-gray-400" />
            ) : (
              <User size={18} className="text-gray-400" />
            )
          }
          type="text"
          placeholder={role === "Recruiter" ? "Company Name" : "Full Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          icon={<Mail size={18} className="text-gray-400" />}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          icon={<Phone size={18} className="text-gray-400" />}
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <InputField
          icon={<LockKeyhole size={18} className="text-gray-400" />}
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white font-bold rounded-lg py-3 mt-4 hover:bg-blue-700 flex items-center justify-center gap-2 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white text-black shadow-2xl rounded-2xl p-8 md:p-12 transition-all duration-300 w-full relative ${
          isLogin ? "max-w-md" : "max-w-4xl"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <X size={28} />
        </button>

        {isLogin ? loginForm : registerForm}

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            {isLogin
              ? "Need an account? Register"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
