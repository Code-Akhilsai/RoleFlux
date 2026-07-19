import { FaSearch } from "react-icons/fa";
import Logo from "../assets/roleflux_logo.png";
import FeaturedRoleCard from "../Components/FeaturedRoleCard.jsx";
import { useNavigate } from "react-router-dom";

const featuredRoles = [
  {
    badge: "New",
    badgeTone: "new",
    logoLabel: "T",
    logoTone: "tcs",
    title: "Snowflake Developer",
    company: "Tata Consultancy Services",
    location: "Bengaluru, India",
    tags: ["Snowflake", "DBT", "Python"],
  },
  {
    badge: "Hot",
    badgeTone: "hot",
    logoLabel: "O",
    logoTone: "outmarch",
    title: "Backend Developer",
    company: "Outmarch",
    location: "Pune, India",
    tags: ["Node.js", "AWS", "MongoDB"],
  },
  {
    badge: "Featured",
    badgeTone: "new",
    logoLabel: "K",
    logoTone: "koa",
    title: "Full Stack Developer",
    company: "Koa Care",
    location: "India",
    tags: ["Flutter", "Node.js", "PostgreSQL"],
  },
];

const Home = () => {
  const nav = useNavigate();

  return (
    <>
      {/*Menu bar*/}
      <section className="flex flex-row items-center justify-between pt-2 pb-3 border border-b-neutral-700 ">
        <div className="flex flex-row items-center gap-2">
          <img src={Logo} className="h-8 rounded-3xl ml-2 lg:h-10 lg:ml-4" />
          <p className="font-bold  text-neutral-300 lg:text-[17px]">RoleFlux</p>
        </div>
        <button
          onClick={() => nav("/login")}
          className="btn-primary text-white font-semibold text-[13px] h-8 w-23 rounded-xl mr-1.5 lg:w-26 lg:h-10 lg:text-[14px]"
        >
          Get Started
        </button>
      </section>

      <section className="mt-15 px-2 text-center  pb-25 ">
        <p className="text-5xl font-sans font-semibold leading-16 tracking-tight md:text-5xl md:mt-7 lg:text-6xl lg:mt-8 ">
          <span className="text-white">Find your next </span>
          <span className="bg-linear-to-r from-indigo-300 via-blue-500 to-slate-700 bg-clip-text text-transparent">
            engineering
          </span>
          <br className="md:hidden" />
          <span className="text-white md:ml-1"> </span>
          <span className="bg-linear-to-r from-indigo-300 via-blue-500 to-slate-700 bg-clip-text text-transparent">
            role
          </span>{" "}
          <span className="text-white">with precision.</span>
        </p>
        <p className="mx-auto max-w-88 sm:max-w-104 md:max-w-120 lg:max-w-136 leading-6 sm:leading-6 md:leading-6 lg:leading-7 text-neutral-300 mt-6 sm:mt-6 md:mt-6 lg:mt-10 text-sm md:text-base">
          {" "}
          Aggregating high-growth opportunities from the Greenhouse ecosystem.
          Filter by stack, stage, and equity—refining your search with technical
          mastery.
        </p>
      </section>

      <section className="mt-6 pb-12 sm:pb-16 lg:pb-20">
        <div className="w-full overflow-hidden border-y border-white/6 bg-[#191622] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <div className="flex min-h-102.5 flex-col sm:min-h-117.5 lg:min-h-54 lg:flex-row">
            <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-12 lg:py-14 lg:border-r lg:border-white/10">
              <div className="text-center">
                <p className="text-[clamp(2.35rem,8vw,4.1rem)] font-semibold leading-none tracking-[-0.06em] bg-[linear-gradient(180deg,#f5efff_0%,#d8ccff_42%,#b9a3ff_100%)] bg-clip-text text-transparent lg:text-[clamp(2rem,4vw,3.25rem)]">
                  10,000+
                </p>
                <p className="mt-2 text-[0.68rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-white/82">
                  Active Roles
                </p>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 py-10 sm:py-12 lg:py-14 lg:border-r lg:border-white/10 before:absolute before:inset-y-10 before:left-4 before:w-px before:bg-white/10 after:absolute after:inset-y-10 after:right-4 after:w-px after:bg-white/10 sm:before:left-6 sm:after:right-6 lg:before:hidden lg:after:hidden">
              <div className="text-center">
                <p className="text-[clamp(2.35rem,8vw,4.1rem)] font-semibold leading-none tracking-[-0.06em] bg-[linear-gradient(180deg,#f5efff_0%,#d8ccff_42%,#b9a3ff_100%)] bg-clip-text text-transparent lg:text-[clamp(2rem,4vw,3.25rem)]">
                  500+
                </p>
                <p className="mt-2 text-[0.68rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-white/82">
                  Top Companies
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-4 py-10 sm:py-12 lg:py-14">
              <div className="text-center">
                <p className="text-[clamp(1.95rem,6.8vw,3.3rem)] font-semibold leading-[0.95] tracking-tighter bg-[linear-gradient(180deg,#efe8ff_0%,#ccb8ff_38%,#a88cff_100%)] bg-clip-text text-transparent sm:text-[clamp(2.2rem,7.1vw,3.7rem)] lg:text-[clamp(1.8rem,3.6vw,3rem)]">
                  Updated Hourly
                </p>
                <p className="mt-2 text-[0.68rem] sm:text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-white/82">
                  Real-time Feed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-5 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
                Featured Roles
              </h2>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-6 text-white/72">
                The most promising engineering positions at elite tech
                companies.
              </p>
            </div>

            <a
              href="/login"
              className="mt-2 flex shrink-0 items-center gap-2 text-sm sm:text-base font-semibold text-white/80 transition hover:text-white"
            >
              View all jobs
              <span aria-hidden="true" className="text-xl leading-none">
                →
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:justify-center ">
            {featuredRoles.map((role) => (
              <FeaturedRoleCard key={role.title} {...role} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 mt-10 sm:px-5 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
              Why Developers Choose RoleFlux
            </h2>

            <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base leading-7 text-white/70">
              RoleFlux is built specifically for software engineers. Instead of
              browsing thousands of unrelated listings, discover curated
              engineering opportunities from startups and leading technology
              companies in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/8 bg-[#1a1820] p-6">
              <div className="text-4xl">⚡</div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Fresh Opportunities
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                New engineering jobs are added regularly so you never miss the
                latest openings.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#1a1820] p-6">
              <div className="text-4xl">🎯</div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Powerful Search
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Search jobs by technology stack, company, location, employment
                type and keywords.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#1a1820] p-6">
              <div className="text-4xl">🏢</div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Top Companies
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Explore opportunities from startups, unicorns and globally
                recognized technology companies.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-[#1a1820] p-6">
              <div className="text-4xl">🚀</div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                Developer Focused
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Designed exclusively for software engineers looking for
                frontend, backend, full-stack, AI and DevOps roles.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-indigo-500/20 bg-linear-to-r from-indigo-500/10 via-blue-500/5 to-transparent p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="text-3xl font-semibold text-white">10,000+</h3>
                <p className="mt-2 text-white/70">
                  Engineering jobs available across multiple companies.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white">500+</h3>
                <p className="mt-2 text-white/70">
                  Hiring companies ranging from startups to enterprise.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-white">24/7</h3>
                <p className="mt-2 text-white/70">
                  Search jobs anytime with a fast and responsive experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 sm:mt-12 lg:mt-20 px-4 sm:px-5 lg:px-8 py-8 sm:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-white/8 bg-[#1a1820] p-6 sm:p-8 lg:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Get notified before the crowd.
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-6 text-white/70">
                  Join 12,000+ engineers receiving weekly custom job alerts for
                  roles at the top 1% of tech startups.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 lg:gap-4 shrink-0">
                <input
                  type="email"
                  placeholder="email@company.com"
                  className="w-full sm:w-auto px-4 py-3 sm:py-3.5 lg:py-3.5 rounded-lg bg-white/6 border border-white/12 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-white/30 focus:bg-white/8 transition"
                />
                <button className="btn-primary text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 lg:py-3.5 rounded-lg whitespace-nowrap">
                  Join Digest
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-16 sm:mt-20 lg:mt-24 border-t border-white/6 bg-[#0f0d13] px-4 sm:px-5 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl ">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-6 sm:gap-4">
            <div className="flex items-center gap-2">
              <img src={Logo} className="h-6 rounded-2xl sm:h-7 lg:h-8" />
              <span className="font-semibold text-white text-sm sm:text-base">
                RoleFlux
              </span>
            </div>

            <nav className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8 text-sm sm:text-base">
              <a href="#" className="text-white/70 transition hover:text-white">
                About
              </a>
              <a href="#" className="text-white/70 transition hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-white/70 transition hover:text-white">
                Terms
              </a>
              <a href="#" className="text-white/70 transition hover:text-white">
                Contact
              </a>
            </nav>

            <p className="text-xs sm:text-sm text-white/50">
              © 2024 RoleFlux. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
