import { FaSearch } from "react-icons/fa";
import Logo from "../assets/roleflux_logo.png";
const Home = () => {
  return (
    <>
      {/*Menu bar*/}
      <section className="flex flex-row items-center justify-between pt-2 pb-3 border border-b-neutral-700 ">
        <img src={Logo} className="h-8 rounded-3xl ml-2" />
        <p className="font-bold -ml-23 text-neutral-300">RoleFlux</p>
        <button className="btn-primary text-white font-semibold text-[13px] h-8 w-23 rounded-xl mr-1.5">
          Get Started
        </button>
      </section>

      <section className="mt-6 px-2 text-center border border-b-neutral-700 pb-25">
        <p className="text-5xl font-sans font-semibold leading-16 tracking-tight md:text-6xl">
          <span className="block text-white">Find your next</span>
          <span className="block bg-linear-to-r from-indigo-300 via-blue-500 to-slate-900 bg-clip-text text-transparent">
            engineering
          </span>
          <span className="block whitespace-nowrap">
            <span className="bg-linear-to-r from-indigo-300 via-blue-500 to-slate-700 bg-clip-text text-transparent">
              role
            </span>{" "}
            <span className="text-white">with</span>
          </span>
          <span className="block text-white"> precision.</span>
        </p>
        <p className="leading-7 text-neutral-300 mt-7">
          {" "}
          Aggregating high-growth opportunities from the Greenhouse ecosystem.
          Filter by stack, stage, and equity—refining your search with technical
          mastery.
        </p>
        <div className="bg-[#131212] rounded-2xl outline-neutral-600 focus-within:outline-1 focus-within:outline-neutral-500 mt-6 flex items-center gap-2 px-3">
          <FaSearch className="text-neutral-500 text-sm shrink-0" />
          <input
            type="text"
            placeholder="search by title , company"
            className="bg-transparent outline-none text-neutral-400 h-14 flex-1"
          />
          <button className="btn-primary text-white font-semibold text-[12px] h-9 w-64 rounded-xl mr-1">
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
