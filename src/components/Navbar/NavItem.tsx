interface NavItemProps {
  label: string;
  active?: boolean;
}

const NavItem = ({ label, active }: NavItemProps) => {
  return (
    <button
      type="button"
      className={`relative rounded-xl px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-indigo-500/10 text-indigo-400"
          : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-indigo-500" />
      )}
    </button>
  );
};

export default NavItem;
