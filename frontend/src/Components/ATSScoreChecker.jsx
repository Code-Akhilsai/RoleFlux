import React, { useEffect, useState } from "react";
import {
  Upload,
  X,
  FileCheck2,
  CircleCheckBig,
  TriangleAlert,
  CircleX,
} from "lucide-react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

const ATSScoreChecker = ({ score }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [atsScore, setATSScore] = useState(score ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const runUpload = async (file) => {
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      setError("Please upload a PDF file");
      return;
    }

    setResumeFile(file);
    setError("");
    setATSScore(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${backend}/api/v1/analyze-resume`,
        formData,

        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      setATSScore(res.data.score);
    } catch (err) {
      setError("Failed to analyze resume");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    runUpload(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    runUpload(event.dataTransfer.files?.[0]);
  };

  const handleClear = () => {
    setResumeFile(null);
    setATSScore(null);
    setError("");
  };

  const scoreTone =
    atsScore >= 80
      ? {
          label: "Excellent",
          color: "text-emerald-400",
          ring: "stroke-emerald-400",
          bar: "bg-emerald-400",
          Icon: CircleCheckBig,
        }
      : atsScore >= 60
        ? {
            label: "Good",
            color: "text-amber-400",
            ring: "stroke-amber-400",
            bar: "bg-amber-400",
            Icon: TriangleAlert,
          }
        : {
            label: "Needs improvement",
            color: "text-red-400",
            ring: "stroke-red-400",
            bar: "bg-red-400",
            Icon: CircleX,
          };

  // circle geometry for score ring
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    atsScore != null
      ? circumference - (atsScore / 100) * circumference
      : circumference;

  useEffect(() => {
    if (score !== undefined && score !== null) {
      setATSScore(score);
    }
  }, [score]);
  return (
    <section className="mt-8 rounded-4xl border border-white/8 bg-[#101116]/92 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-white/46">
          Resume analysis
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          ATS Score Checker
        </h2>
        <p className="mt-1 text-sm text-white/60">
          Upload your resume to check ATS compatibility
        </p>
      </div>

      <div>
        {atsScore === null ? (
          <div className="space-y-4">
            {!resumeFile ? (
              <label className="block">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`group relative overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
                    dragActive
                      ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
                      : "border-white/15 bg-white/3 hover:border-white/30 hover:bg-white/6"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
                  <div className="relative flex flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 ring-1 ring-inset ring-indigo-400/20">
                      <Upload className="h-6 w-6 text-indigo-400" />
                    </div>
                    <p className="text-white font-semibold">
                      Drop your resume here or click to browse
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      PDF only · Max 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-inset ring-indigo-400/20">
                    <FileCheck2 className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-white/40">
                      {(resumeFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                {!loading && (
                  <button
                    onClick={handleClear}
                    className="shrink-0 rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <CircleX className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400" />
                </span>
                <p className="text-sm text-white/70">Analyzing resume…</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-3xl border border-white/8 bg-white/3 p-8">
              <div className="flex flex-col items-center text-center">
                {/* Ring */}
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-white/8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      className={`${scoreTone.ring} transition-all duration-700 ease-out`}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {atsScore}
                    </span>
                    <span className="text-[11px] text-white/40">/100</span>
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${scoreTone.color}`}
                >
                  <scoreTone.Icon className="h-4 w-4" />
                  {scoreTone.label}
                </div>

                {/* Description */}
                <p className="mt-6 max-w-md text-center text-sm leading-7 text-white/60">
                  Your resume has been analyzed for ATS compatibility.
                  <br />A higher score indicates better compatibility with
                  Applicant Tracking Systems.
                </p>
              </div>
            </div>

            <button
              onClick={handleClear}
              className="w-full h-12 rounded-2xl border border-white/15 text-white font-semibold hover:border-white/30 hover:bg-white/3 transition-colors"
            >
              Analyze another resume
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ATSScoreChecker;
