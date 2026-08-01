const About = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-white mb-6">About RoleFlux</h1>

      <p className="text-slate-300 leading-8 mb-6">
        RoleFlux is a modern job aggregation platform designed to simplify the
        job search process by bringing opportunities from multiple sources into
        one place. Instead of switching between different job portals, users can
        search, filter, and explore relevant job listings through a unified
        interface.
      </p>

      <p className="text-slate-300 leading-8 mb-6">
        Beyond job discovery, RoleFlux provides an AI-powered resume analysis
        feature using Google's Gemini API. Users can upload their resumes to
        receive an ATS compatibility score along with personalized suggestions
        to improve their chances of getting shortlisted.
      </p>

      <p className="text-slate-300 leading-8">
        Built with React, Node.js, Express, MongoDB, Redis, Firebase
        Authentication, and modern web technologies, RoleFlux focuses on
        delivering a fast, secure, and user-friendly experience for students and
        job seekers.
      </p>
    </section>
  );
};

export default About;
