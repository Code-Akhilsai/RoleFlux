const toneClasses = {
  new: "bg-[#2d2940] text-[#d7cef9]",
  hot: "bg-[#372b20] text-[#f0b36f]",
};

const logoToneClasses = {
  stripe:
    "bg-gradient-to-br from-white/95 via-white/70 to-white/25 text-[#111018]",
  anthropic:
    "bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-700 text-white",
  openai:
    "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-700 text-white",
};

const FeaturedRoleCard = ({
  badge,
  badgeTone,
  logoLabel,
  logoTone,
  title,
  company,
  location,
  salary,
  tags,
}) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#17151e] p-4 sm:p-4.5 lg:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]x">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-md border border-white/10 ${
            logoToneClasses[logoTone] ?? logoToneClasses.stripe
          }`}
        >
          <span className="text-sm font-bold tracking-tight">{logoLabel}</span>
        </div>

        <span
          className={`rounded-md px-3 py-1 text-xs font-semibold ${
            toneClasses[badgeTone] ?? toneClasses.new
          }`}
        >
          {badge}
        </span>
      </div>

      <div className="mt-7">
        <h3 className="text-[1.35rem] sm:text-[1.5rem] lg:text-[1.7rem] font-semibold tracking-[-0.04em] text-white/92 lg:w-90">
          {title}
        </h3>
        <p className="mt-2 text-sm font-medium text-white/60 sm:text-[0.95rem]">
          {company} • {location} {salary}
        </p>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-[0.7rem] font-semibold text-white/68"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default FeaturedRoleCard;
