import { ChevronDown } from "lucide-react";
import type { User } from "../../features/auth/auth.interface";
import { Link } from "react-router-dom";

const ProfileMenu = ({ user }: { user: User | null }) => {
  if (!user || !user.id) {
    return (
      <Link
        to={"/login"}
        className="flex cursor-pointer h-9 w-9 px-8 items-center justify-center rounded-xl bg-indigo-500/10 text-xs font-semibold text-indigo-400 ring-1 ring-indigo-500/10"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="group flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 transition hover:bg-white/4">
      <div className="flex h-9 w-9 font-bold text-lg items-center justify-center rounded-xl bg-indigo-500/30 text-indigo-200 ring-1 ring-indigo-500/10">
        {user?.name.at(0)}
      </div>

      <div className="hidden text-left sm:block">
        <p className="text-sm font-medium leading-4 text-slate-200">
          {user?.name}
        </p>

        <p className="mt-1 text-[10px] font-semibold uppercase text-slate-400">
          {user?.role.replaceAll("_", " ")}
        </p>
      </div>

      <ChevronDown
        size={15}
        className="ml-1 text-slate-600 transition group-hover:text-slate-400"
      />
    </div>
  );
};

export default ProfileMenu;
