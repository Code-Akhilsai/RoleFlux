import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#15121b] text-white p-6">
      <div className="text-center">
        <h1 className="text-7xl font-black text-indigo-400">404</h1>
        <p className="mt-4 text-lg text-white/70">Page not found</p>
        <button
          onClick={() => nav("/")}
          className="mt-6 rounded-2xl btn-primary px-6 py-3 font-semibold text-white"
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
