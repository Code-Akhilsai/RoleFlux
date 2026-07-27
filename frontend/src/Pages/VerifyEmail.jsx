import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const backend = import.meta.env.VITE_BACKEND_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No verification token found");
        return;
      }

      try {
        const res = await axios.get(`${backend}/api/v1/verify-email`, {
          params: { token },
          withCredentials: true,
        });

        if (res.status === 200) {
          setStatus("success");
          setMessage("Email verified successfully!");

          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Email verification failed. Link may be expired.",
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

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
            <div className="text-center">
              {status === "loading" && (
                <>
                  <Loader className="h-16 w-16 mx-auto mb-4 text-indigo-400 animate-spin" />
                  <h1 className="text-2xl font-black mb-2">
                    Verifying email...
                  </h1>
                  <p className="text-slate-400">
                    Please wait while we verify your email address.
                  </p>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-400" />
                  <h1 className="text-2xl font-black mb-2 text-green-400">
                    Success!
                  </h1>
                  <p className="text-slate-400 mb-6">{message}</p>
                  <p className="text-sm text-slate-500">
                    Redirecting to dashboard...
                  </p>
                </>
              )}

              {status === "error" && (
                <>
                  <XCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
                  <h1 className="text-2xl font-black mb-2 text-red-400">
                    Verification Failed
                  </h1>
                  <p className="text-slate-400 mb-6">{message}</p>
                  <button
                    onClick={() => navigate("/register")}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                  >
                    Back to Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
