import {
  Briefcase,
  ChevronDown,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import logo from "../assets/roleflux_logo.png";
import profile from "../assets/profile.png";

const navigationLinks = ["Find Jobs", "Companies", "Resources"];

const filterItems = [
  { label: "Location", icon: MapPin },
  { label: "Job Type", icon: Briefcase },
];

const roleCounts = [
  { label: "Engineering", count: 124 },
  { label: "Product Design", count: 82 },
  { label: "Data Science", count: 45 },
  { label: "Marketing", count: 29 },
];

const featuredJobs = [
  {
    company: "Nexus AI",
    time: "2 hours ago",
    title: "Senior Full Stack Engineer",
    location: "San Francisco",
    salary: "$160k - $220k",
    tag: "Greenhouse",
    tagIcon: ShieldCheck,
  },
  {
    company: "Flow Systems",
    time: "5 hours ago",
    title: "Staff Frontend Architect",
    location: "Remote (US/EU)",
    salary: "Full-time",
    tag: "Greenhouse",
    tagIcon: ShieldCheck,
  },
  {
    company: "Vortex Crypto",
    time: "Yesterday",
    title: "Backend Engineer (Rust)",
    location: "New York, NY",
    salary: "Web3",
    tag: "Greenhouse",
    tagIcon: ShieldCheck,
  },
];

const JobMeta = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/5 px-2.5 py-1 text-[0.72rem] font-medium text-white/80">
    <Icon className="h-3.5 w-3.5 text-[#8bb1ff]" />
    {children}
  </span>
);

const Dashboard = () => {
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
          <img src={profile} className="h-8 rounded-3xl  md:h-10 lg:-mx-6" />
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
                type="text"
                placeholder="Search job titles, keywords..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/38"
              />
            </label>

            {filterItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex h-12 items-center justify-between rounded-xl border border-white/8 bg-[#101015] px-4 text-sm text-white/70 transition hover:border-white/15 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5 text-white/55" />
                  {label}
                </span>
                <ChevronDown className="h-4 w-4 text-white/40" />
              </button>
            ))}

            <button className="flex h-12 items-center justify-between rounded-xl px-3 text-sm font-medium text-white/78 lg:justify-end lg:px-0">
              <span className="mr-3 hidden sm:inline">Remote</span>
              <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/16 p-0.5">
                <span className="h-5 w-5 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
              </span>
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/8 bg-[#121218] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.015)]">
              <h2 className="text-lg font-semibold tracking-[-0.03em] text-white/92">
                Popular Roles
              </h2>

              <div className="mt-5 space-y-4">
                {roleCounts.map((role) => (
                  <div
                    key={role.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/74">{role.label}</span>
                    <span className="text-white/42">{role.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <article className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#111116] shadow-[0_0_0_1px_rgba(255,255,255,0.015)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,92,255,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(92,170,255,0.18),transparent_32%)]" />
              <div className="relative min-h-52 p-4">
                <span className="inline-flex rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-white/72">
                  Featured
                </span>
                <div className="mt-16 max-w-40">
                  <h3 className="text-[1.15rem] font-semibold leading-5 tracking-[-0.04em] text-white">
                    Build the future at RoleFlux.
                  </h3>
                </div>
              </div>
            </article>
          </aside>

          <section className="space-y-3">
            {featuredJobs.map((job) => {
              const TagIcon = job.tagIcon;

              return (
                <article
                  key={job.title}
                  className="grid gap-4 rounded-2xl border border-white/8 bg-[#111116] px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.015)] sm:px-5 sm:py-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-[#1d1a27] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.015)]">
                      <span className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#8fd3ff_0%,#1a2540_48%,#0b0b10_100%)]" />
                    </div>

                    <div className="lg:hidden">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white/75">
                        <span>{job.company}</span>
                        <span className="text-white/35">•</span>
                        <span>{job.time}</span>
                      </div>
                      <h3 className="mt-1 text-[1.02rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.15rem]">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/75">
                      <span>{job.company}</span>
                      <span className="text-white/35">•</span>
                      <span>{job.time}</span>
                    </div>
                    <h3 className="mt-1 text-[1.18rem] font-semibold tracking-[-0.045em] text-white xl:text-[1.28rem]">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <JobMeta icon={MapPin}>{job.location}</JobMeta>
                      <JobMeta icon={Briefcase}>{job.salary}</JobMeta>
                      <JobMeta icon={TagIcon}>{job.tag}</JobMeta>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:hidden">
                    <JobMeta icon={MapPin}>{job.location}</JobMeta>
                    <JobMeta icon={Briefcase}>{job.salary}</JobMeta>
                    <JobMeta icon={TagIcon}>{job.tag}</JobMeta>
                  </div>

                  <div className="flex lg:justify-end">
                    <button className="btn-primary h-10 w-full rounded-md px-5 text-sm font-semibold text-white sm:w-auto sm:min-w-28">
                      Apply Now
                    </button>
                  </div>
                </article>
              );
            })}

            <div className="flex justify-center pt-4">
              <button className="rounded-md border border-white/12 bg-transparent px-6 py-3 text-sm font-semibold text-white/88 transition hover:border-white/20 hover:bg-white/4">
                Load more opportunities
              </button>
            </div>
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
