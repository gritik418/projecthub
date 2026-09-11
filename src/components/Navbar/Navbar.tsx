import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUser } from "../../features/auth/auth.slice";
import Logo from "../Logo/Logo";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

const AUTH_ROUTES = ["/login", "/register"];

const Navbar = () => {
  const location = useLocation();

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    location.pathname.startsWith(route),
  );

  if (isAuthRoute) return null;

  const user = useSelector(selectUser);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-gray-800 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          <NavItem label="Dashboard" active />
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/4 hover:text-slate-300"
          >
            <Bell size={18} />

            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-[#070B16]" />
          </button>

          <div className="mx-2 hidden h-6 w-px bg-white/5 sm:block" />

          <ProfileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
