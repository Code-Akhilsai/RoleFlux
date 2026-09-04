import {
  Briefcase,
  ChevronDown,
  LoaderCircle,
  MapPin,
  Search,
  ArrowLeft,
} from "lucide-react";
import logo from "../assets/roleflux_logo.png";
import { useState } from "react";
import Profilebox from "../Components/Profilebox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import company from "../assets/company.png";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useRef } from "react";

const filterItems = [
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    options: [
      "Remote",
      "Bengaluru, Karnataka",
      "Gurugram, Haryana",
      "Noida, Uttar Pradesh",
      "Mumbai, Maharashtra",
      "New Delhi, Delhi",
      "Hyderabad, Telangana",
      "Pune, Maharashtra",
      "Chennai, Tamil Nadu",
      "Kolkata, West Bengal",
      "Ahmedabad, Gujarat",
      "Jaipur, Rajasthan",
    ],
  },
  {
    key: "jobType",
    label: "Job Type",
    icon: Briefcase,
    options: ["ALL", "FULLTIME", "PARTTIME", "INTERN"],
  },
];

const JobMeta = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/80">
    <Icon className="h-3.5 w-3.5 text-[#8bb1ff]" />
    {children}
  </span>
);
const backend = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", blockBack);
    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    location: null,
    jobType: null,
  });
  const [searching, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backbtn, setBackbtn] = useState(true);
  const [saveJob, setSaveJob] = useState([]);
  const isInitialMount = useRef(true);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const nav = useNavigate();

  const handleFilterSelect = (filterKey, option) => {
    setSelectedFilters((current) => ({
      ...current,
      [filterKey]: option === "ALL" ? null : option,
    }));
    setActiveFilter(null);
  };

  const profileNav = async () => {
    const res = await axios.get(`/api/v1/profile`, {
      withCredentials: true,
    });

    if (res.status == 200) return nav("/profile");
    else return alert("Internal server error");
  };

  const handlelogout = async () => {
    try {
      const res = await axios.post(`/api/v1/logout`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("Logout successful");
        return nav("/", { replace: true });
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`/api/v1/jobs`, {
        searching,
        jobType: selectedFilters.jobType,
        location: selectedFilters.location,
      });
      setJobs(res.data);
      setBackbtn(true);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async () => {
    setLoading(true);
    setBackbtn(false);

    try {
      const searchedJobs = await axios.get(`/api/v1/jobs/search`, {
        params: {
          searching,
          jobType: selectedFilters.jobType,
          location: selectedFilters.location,
        },
      });

      setJobs(searchedJobs.data);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = (jobId) => {
    const alreadySaved = saveJob.some((job) => job.job_id === jobId);

    if (alreadySaved) {
      setSaveJob((prev) => prev.filter((job) => job.job_id !== jobId));
    } else {
      const bookmarkedJob = jobs.find((job) => job.job_id === jobId);

      if (!bookmarkedJob) return;

      setSaveJob((prev) => [...prev, bookmarkedJob]);
    }
  };

  //Load saved jobs on mount

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        setLoadingJobs(true);
        const res = await axios.get(`/api/v1/savejob`, {
          withCredentials: true,
        });
        setSaveJob(res.data?.jobs ?? []);
      } catch (error) {
        console.log("Error loading saved jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    loadSavedJobs();
  }, [backend]);

  useEffect(() => {
    if (loadingJobs || isInitialMount.current) {
      if (!loadingJobs) isInitialMount.current = false;
      return;
    }
    const savejobDB = async () => {
      try {
        const jobsToSave = saveJob.map((job) => ({
          job_id: job.job_id,
          job_title: job.job_title,
          employer_name: job.employer_name,
          job_location: job.job_location,
          employer_logo: job.employer_logo,
          job_apply_link: job.job_apply_link,
          job_employment_type: job.job_employment_type,
          job_is_remote: job.job_is_remote,
          job_publisher: job.job_publisher,
        }));

        console.log("Saving:", jobsToSave);

        await axios.post(
          `/api/v1/savejob`,
          { jobs: jobsToSave },
          { withCredentials: true },
        );
        console.log("Saved successfully");
      } catch (error) {
        console.log(error);
      }
    };

    savejobDB();
  }, [saveJob, loadingJobs, backend]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`/api/v1/profile`, {
        withCredentials: true,
      });

      const username = res.data?.user?.username;
      localStorage.setItem("username", username);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <header className="border-b border-white/8 bg-[#0b0b10]/95 backdrop-blur supports-backdrop-filter:bg-[#0b0b10]/85">
        <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-[#15141c] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <img src={logo} />
            </div>
            <span className="text-[1.05rem] font-semibold tracking-[-0.04em] text-white/92">
              RoleFlux
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 transition hover:ring-white/20 md:h-10 md:w-10"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span className="flex h-full w-full items-center justify-center text-sm font-medium">
                {localStorage.getItem("username")?.slice(0, 2).toUpperCase() ||
                  "U"}
              </span>
            </button>

            {open ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50">
                <Profilebox
                  profileNav={profileNav}
                  handlelogout={handlelogout}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-360 px-4 pb-16 pt-8 sm:px-6 lg:px-8 xl:px-10">
        <section className="max-w-4xl">
          <h1 className="text-[clamp(2.4rem,4.8vw,4.2rem)] font-semibold tracking-[-0.06em] text-[#f4f1ff]">
            Engineer your career.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78 sm:text-base">
            Discover high-growth opportunities at top-tier tech companies.
            Precision-matched roles for developers and founders.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-white/8 bg-white/3 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.015)] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.45fr)_repeat(2,minmax(0,0.52fr))_auto] lg:items-center">
            <label className="flex h-12 items-center gap-3 rounded-xl border border-white/8 bg-[#101015] px-4 text-white/60 focus-within:border-white/20">
              <Search className="h-4.5 w-4.5 shrink-0 text-white/55" />
              <input
                value={searching}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search job titles, keywords..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/38"
              />
            </label>

            {filterItems.map(({ key, label, icon: Icon, options }) => (
              <div key={label} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter((current) =>
                      current === key ? null : key,
                    );
                  }}
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-white/8 bg-[#101015] px-4 text-sm text-white/70 transition hover:border-white/15 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5 text-white/55" />
                    {selectedFilters[key] ?? label}
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/40" />
                </button>

                {activeFilter === key ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-xl border border-white/8 bg-[#111116] p-2 shadow-xl">
                    {options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-white/72 transition hover:bg-white/5 hover:text-white"
                        onClick={() => handleFilterSelect(key, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              onClick={searchJobs}
              className="btn-primary h-10 w-full rounded-md px-5 text-sm font-semibold text-white sm:w-auto sm:min-w-28"
            >
              Search
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-[#121218] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.015)]">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white/92">
                Job Market Insights
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  { label: "Active Listings", value: jobs.length },
                  {
                    label: "Remote Opportunities",
                    value: jobs.filter((j) => j.job_is_remote).length,
                  },
                  {
                    label: "Full-time Roles",
                    value: jobs.filter((j) =>
                      j.job_employment_types?.includes("FULLTIME"),
                    ).length,
                  },
                  {
                    label: "Top Location",
                    value: jobs.length
                      ? Object.entries(
                          jobs.reduce((acc, j) => {
                            const loc = j.job_location || "Unknown";
                            acc[loc] = (acc[loc] || 0) + 1;
                            return acc;
                          }, {}),
                        ).sort((a, b) => b[1] - a[1])[0]?.[0] || "-"
                      : "-",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/74">{label}</span>
                    <span className="rounded-lg bg-white/8 px-2.5 py-1 text-white/90 font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <article className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#111116] shadow-[0_0_0_1px_rgba(255,255,255,0.015)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,92,255,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(92,170,255,0.18),transparent_32%)]" />
              <div className="relative min-h-52 p-4">
                <span className="inline-flex rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-white/72">
                  Smart Matching
                </span>
                <div className="mt-6 max-w-40">
                  <h3 className="text-[1.15rem] font-semibold leading-7 tracking-[-0.04em] text-white">
                    Get matched with your ideal roles instantly.
                  </h3>
                </div>
              </div>
            </article>
          </aside>

          <section className="space-y-3">
            <div
              className={`${backbtn ? "hidden" : "flex"} cursor-pointer select-none items-center gap-1`}
              onClick={fetchJobs}
            >
              <ArrowLeft size={20} />
              <p className="text-white text-[14px]">Back</p>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-[#111116] px-4 py-5 text-sm text-white/70">
                <LoaderCircle className="h-4 w-4 animate-spin text-white/55" />
                Loading jobs...
              </div>
            ) : null}

            {!loading && jobs.length === 0 ? (
              <div className="rounded-2xl border border-white/8 bg-[#111116] px-6 py-10 text-center">
                <h3 className="text-lg font-semibold text-white">
                  No jobs found
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Try a different search keyword or filters.
                </p>
              </div>
            ) : (
              jobs.map((job) => {
                const {
                  job_id,
                  job_title,
                  employer_name,
                  job_apply_link,
                  job_location,
                  employer_logo,
                  job_employment_type,
                  job_publisher,
                  job_is_remote,
                } = job;

                return (
                  <article
                    key={job_id}
                    className="grid gap-4 rounded-2xl border border-white/8 bg-[#111116] px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.015)] sm:px-5 sm:py-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-[#1d1a27] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.015)]">
                        <img
                          src={employer_logo || company}
                          alt={employer_name}
                          className="h-10 w-10 object-contain"
                          onError={(e) => {
                            e.target.src = company;
                          }}
                        />
                      </div>

                      <div className="lg:hidden">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                          <span>{employer_name}</span>
                          <span className="text-white/35">•</span>
                          <span>{job_publisher}</span>
                        </div>
                        <h3 className="mt-1 text-[1.02rem] font-semibold tracking-[-0.045em] text-white sm:text-[1.15rem]">
                          {job_title.length > 40
                            ? `${job_title.slice(0, 40)}...`
                            : job_title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <JobMeta icon={MapPin}>{job_location}</JobMeta>
                          <JobMeta icon={Briefcase}>
                            {job_employment_type}
                          </JobMeta>
                          {job_is_remote && (
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/80">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:block">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
                        <span>{employer_name}</span>
                        <span className="text-white/35">•</span>
                        <span>{job_publisher}</span>
                      </div>
                      <h3 className="mt-1 text-[1.18rem] font-semibold tracking-[-0.045em] text-white xl:text-[1.28rem]">
                        {job_title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <JobMeta icon={MapPin}>{job_location}</JobMeta>
                        <JobMeta icon={Briefcase}>
                          {job_employment_type}
                        </JobMeta>
                        {job_is_remote && (
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/80">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex  flex-row justtify-center items-center gap-8 lg:justify-end">
                      {saveJob.some((job) => job.job_id === job_id) ? (
                        <FaBookmark
                          size={19}
                          onClick={() => handleBookmark(job_id)}
                        />
                      ) : (
                        <FaRegBookmark
                          size={19}
                          onClick={() => handleBookmark(job_id)}
                        />
                      )}
                      <a
                        href={job_apply_link}
                        target="_blank"
                        className="w-full"
                      >
                        <button className="btn-primary h-10 w-40 rounded-md px-5 text-sm font-semibold text-white sm:w-auto sm:min-w-28">
                          Apply Now
                        </button>
                      </a>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </section>
      </main>

      <footer className="border-t border-white/8 bg-[#0b0b10] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto flex max-w-360 flex-col gap-4 text-sm text-center text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>RoleFlux — precision-matched opportunities for builders.</p>
          <p>© 2026 RoleFlux</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
