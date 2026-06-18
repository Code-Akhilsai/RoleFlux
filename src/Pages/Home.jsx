import { FaSearch } from "react-icons/fa";
import Logo from "../assets/roleflux_logo.png";
const Home = () => {
  return (
    <>
      {/*Menu bar*/}
      <section className="flex flex-row items-center justify-between pt-2 pb-3 border border-b-neutral-700 ">
        <div className="flex flex-row items-center gap-2">
          <img src={Logo} className="h-8 rounded-3xl ml-2 lg:h-10 lg:ml-4" />
          <p className="font-bold  text-neutral-300 lg:text-[17px]">RoleFlux</p>
        </div>
        <button className="btn-primary text-white font-semibold text-[13px] h-8 w-23 rounded-xl mr-1.5 lg:w-26 lg:h-10 lg:text-[14px]">
          Get Started
        </button>
      </section>

      <section className="mt-6 px-2 text-center border border-b-neutral-700 border-transparent pb-25 ">
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
        <div className="bg-[#131212] rounded-2xl outline-neutral-600 focus-within:outline-1 focus-within:outline-neutral-500 mt-6 flex items-center gap-2 px-3 sm:w-150 sm:mx-auto lg:mt-11">
          <FaSearch className="text-neutral-500 text-sm shrink-0" />
          <input
            type="text"
            placeholder="search by title , company"
            className="bg-transparent outline-none text-neutral-400 h-14 flex-1 "
          />
          <button className="btn-primary text-white font-semibold text-[12px] h-9 w-64 rounded-xl mr-1 sm:w-30 lg:w-26 lg:text-[15px] ">
            Search
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
