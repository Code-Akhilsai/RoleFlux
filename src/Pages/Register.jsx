import React, { useState } from "react";
import logo from "../assets/roleflux_logo.png";
import "../App.css";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();
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

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full h-12 rounded-2xl border border-slate-500/20 bg-slate-800/70 text-gray-200 px-4 outline-none text-sm placeholder-slate-500 shadow-inner focus:border-indigo-500/50 transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 mt-2 border-0 rounded-2xl btn-primary text-white text-base font-bold cursor-pointer   hover:shadow-purple-500/50 transition"
              >
                Register
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
