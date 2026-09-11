const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
        <span className="text-lg text-white font-bold">P</span>
      </div>

      <span className="text-xl font-semibold text-white tracking-tight">
        Project<span className="text-indigo-400">Hub</span>
      </span>
    </div>
  );
};

export default Logo;
