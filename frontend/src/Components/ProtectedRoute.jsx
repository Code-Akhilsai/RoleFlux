import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    axios
      .get(`/api/v1/me`, { withCredentials: true })
      .then(() => setStatus("authed"))
      .catch(() => setStatus("guest"));
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#15121b] text-white">
        Loading...
      </div>
    );
  }

  if (status === "guest") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
