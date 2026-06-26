import React, { useState } from "react";
import logo from "../assets/roleflux_logo.png";
import "../App.css";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const validate = () => {
    const nextErrors = {};

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (username.trim().length < 3) {
      nextErrors.username = "Username must be at least 3 characters.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  };

  const handleChange = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const res = await axios.post(
      `${backend}/api/v1/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );

    if (res.status == 200) {
      nav("/dashboard");
    } else {
      alert("registration is failed");
    }

    setTimeout(() => setLoading(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#15121b] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at top, rgba(99, 102, 241, 0.32), transparent 35%)",
        }}
      ></div>

      <div className="relative w-full max-w-md">
        <div className="p-0.5 rounded-3xl bg-linear-to-br from-white/45 to-white/8 shadow-2xl">
          <div className="rounded-3xl p-8 bg-slate-900/92 backdrop-blur-xl text-gray-200">
            <div className="mb-7 text-center flex flex-col items-center">
              <img src={logo} className="h-20 w-20 rounded-2xl mb-4" />
              <h1 className="text-2xl font-black">Create account</h1>
              <p className="mt-2.5 text-slate-400 text-sm leading-relaxed">
                Sign up with your username, email, and password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(event) =>
                    handleChange("username", event.target.value)
                  }
                  placeholder="Enter your username"
                  className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
                  aria-invalid={Boolean(errors.username)}
                  required
                />
                {errors.username ? (
                  <p className="text-sm text-red-300">{errors.username}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
                  aria-invalid={Boolean(errors.email)}
                  required
                />
                {errors.email ? (
                  <p className="text-sm text-red-300">{errors.email}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    placeholder="Create a password"
                    className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition pr-12"
                    aria-invalid={Boolean(errors.password)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="text-sm text-red-300">{errors.password}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2 border-0 rounded-2xl btn-primary text-white text-base font-bold cursor-pointer   hover:shadow-purple-500/50 transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="text-center text-white/60 text-sm mt-6">
                Already have an account?{" "}
                <a
                  onClick={() => nav("/login")}
                  href="#"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
