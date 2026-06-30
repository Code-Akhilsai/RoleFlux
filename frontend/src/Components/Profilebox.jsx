const menuItems = ["Profile", "Notifications", "Settings"];

const Profilebox = () => {
  return (
    <div className="w-44 rounded-2xl border border-white/10 bg-[#17171f] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item}>
            <button
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-white/82 transition hover:bg-white/6 hover:text-white"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profilebox;
