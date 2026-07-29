import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Clock3,
  ExternalLink,
  LogOut,
  MapPin,
  Sparkles,
  Bookmark,
  X,
} from "lucide-react";
import ATSScoreChecker from "../Components/ATSScoreChecker";

const backend = import.meta.env.VITE_BACKEND_URL;

const toSavedJobCard = (job, index) => {
  if (typeof job === "string") {
    return {
      key: `${job}-${index}`,
      title: job,
      company: "Saved role",
      location: "Location unavailable",
      tags: [],
      job_id: job,
    };
  }

  const title =
    job?.job_title ??
    job?.title ??
    job?.name ??
    job?.position ??
    job?.role ??
    "Saved role";
  const company =
    job?.company ??
    job?.employer_name ??
    job?.job_company_name ??
    job?.organization ??
    "Company unavailable";
  const location =
    job?.job_location ??
    job?.location ??
    job?.city ??
    job?.country ??
    "Location unavailable";
  const tags = Array.isArray(job?.tags)
    ? job.tags
    : [job?.job_employment_type, job?.job_is_remote ? "Remote" : null].filter(
        Boolean,
      );

  return {
    key: job?.job_id ?? job?.id ?? job?.slug ?? `${title}-${company}-${index}`,
    title,
    company,
    location,
    salary:
      job?.job_salary ??
      job?.salary ??
      job?.compensation ??
      job?.job_min_salary,
    link: job?.job_apply_link ?? job?.apply_link ?? job?.url,
    tags,
    job_id: job?.job_id,
  };
};

const Profile = () => {
  const [data, setData] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch user profile
        const res = await axios.get(`${backend}/api/v1/profile`, {
          withCredentials: true,
        });
        setData(res.data.user ?? {});

        // Fetch saved jobs
        const jobsRes = await axios.get(`${backend}/api/v1/savejob`, {
          withCredentials: true,
        });

        const jobs = jobsRes.data?.jobs ?? [];
        const transformedJobs = jobs.map((job, index) =>
          toSavedJobCard(job, index),
        );
        setSavedJobs(transformedJobs);
      } catch (fetchError) {
        console.error("Profile load error:", fetchError);
        setError("We could not load your profile right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handlelogout = async () => {
    try {
      const res = await axios.post(`${backend}/api/v1/logout`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("Logout successful");
        navigate("/");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  const handleUnsaveJob = async (jobToRemove) => {
    try {
      // Remove job from local state immediately
      const updatedSavedJobs = savedJobs.filter(
        (job) => job.job_id !== jobToRemove.job_id,
      );
      setSavedJobs(updatedSavedJobs);

      // Get original jobs from backend
      const jobsRes = await axios.get(`${backend}/api/v1/savejob`, {
        withCredentials: true,
      });
      const originalJobs = jobsRes.data?.jobs ?? [];

      // Filter out the unsaved job
      const filteredJobs = originalJobs.filter(
        (job) => job.job_id !== jobToRemove.job_id,
      );

      // Update backend with filtered jobs
      await axios.post(
        `${backend}/api/v1/savejob`,
        { jobs: filteredJobs },
        { withCredentials: true },
      );

      console.log("Job unsaved successfully");
    } catch (error) {
      console.error("Error unsaving job:", error);
      // Restore the job if request fails
      try {
        const jobsRes = await axios.get(`${backend}/api/v1/savejob`, {
          withCredentials: true,
        });
        const jobs = jobsRes.data?.jobs ?? [];
        const transformedJobs = jobs.map((job, index) =>
          toSavedJobCard(job, index),
        );
        setSavedJobs(transformedJobs);
      } catch (restoreError) {
        console.error("Error restoring job:", restoreError);
      }
    }
  };

  const initials = (data.username ?? data.email ?? "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,108,255,0.28),transparent_28%),radial-gradient(circle_at_top_right,rgba(131,90,255,0.16),transparent_24%),radial-gradient(circle_at_bottom,rgba(19,143,255,0.14),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/78 transition hover:border-white/18 hover:bg-white/8 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-[#1a1c2c] via-[#12131b] to-[#0f1629] text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              {initials}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                Profile
              </p>
              <p className="text-sm font-medium text-white/88">
                {data.username ?? "Guest user"}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-8 pt-8 sm:pt-10">
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <article className="relative overflow-hidden rounded-4xl border border-white/8 bg-[#12131a]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_32%),radial-gradient(circle_at_bottom_right,rgba(66,120,255,0.14),transparent_32%)]" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/72">
                    <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                    Career snapshot
                  </span>

                  <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-[-0.07em] text-white">
                    Welcome back, {data.username ?? "builder"}.
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
                    Track the roles you have saved, revisit high-fit openings,
                    and keep your job search organized from one focused profile.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlelogout}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/82 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </article>

            <aside className="space-y-4 rounded-4xl border border-white/8 bg-[#111219]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Bookmark className="h-5 w-5 text-sky-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/48">
                    Saved jobs
                  </p>
                  <p className="text-2xl font-semibold tracking-tighter text-white">
                    {savedJobs.length}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/46">
                    Account
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-white/86">
                    {data.email ?? "No email attached"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/46">
                    Saved openings
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/86">
                    {savedJobs.length ? "Ready to review" : "Nothing saved yet"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/46">
                    Member since
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/86">
                    {data.createdAt
                      ? new Date(data.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          year: "numeric",
                        })
                      : "Recently joined"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/46">
                    Search status
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/86">
                    Curated engineering roles
                  </p>
                </div>
              </div>
            </aside>
          </section>

          <section className="mt-8 rounded-4xl border border-white/8 bg-[#101116]/92 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/46">
                  Saved library
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-white">
                  Your saved jobs
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-white/64">
                Keep a shortlist of roles you want to revisit. This section
                supports saved jobs stored on your account and renders
                gracefully even if some job details are incomplete.
              </p>
            </div>

            {loading ? (
              <div className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-52 animate-pulse rounded-2xl border border-white/8 bg-white/4"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 px-4 py-5 text-sm text-amber-100">
                {error}
              </div>
            ) : savedJobs.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {savedJobs.map((job) => (
                  <article
                    key={job.key}
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#161822] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/14 hover:bg-[#181b26]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex rounded-full border border-emerald-400/16 bg-emerald-400/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                        Saved
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUnsaveJob(job)}
                        className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/40 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                        title="Unsave this job"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-white">
                      {job.title}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-white/68">
                      <p>{job.company}</p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-white/44" />
                        {job.location}
                      </p>
                      {job.salary ? (
                        <p className="flex items-center gap-1.5">
                          <Clock3 className="h-4 w-4 text-white/44" />
                          {job.salary}
                        </p>
                      ) : null}
                    </div>

                    {job.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/72"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-auto pt-5">
                      {job.link ? (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                        >
                          Open role
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigate("/dashboard")}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                        >
                          Browse similar roles
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/10 bg-white/3 p-8 sm:p-10">
                <div className="max-w-2xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Bookmark className="h-5 w-5 text-sky-300" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tighter text-white">
                    No saved jobs yet.
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/68">
                    Start building your shortlist from the dashboard. Once you
                    save roles, they will appear here for quick access.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  >
                    Explore jobs
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </section>

          <ATSScoreChecker score={data.atsScore} />
        </main>
      </div>
    </div>
  );
};

export default Profile;
