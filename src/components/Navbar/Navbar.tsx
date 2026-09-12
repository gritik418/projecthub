import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/auth.slice";
import Logo from "../Logo/Logo";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";
import NotificationDropdown from "../Notification/NotificationDropdown";
import { useState } from "react";
import { selectNotifications } from "../../features/notification/notification.slice";

const AUTH_ROUTES = ["/login", "/register"];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notifications = useSelector(selectNotifications);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <NavItem
            label="Dashboard"
            onClick={() => {
              navigate("/dashboard");
            }}
            active={location.pathname.startsWith("/dashboard")}
          />

          <NavItem
            label="Projects"
            onClick={() => {
              navigate("/projects");
            }}
            active={location.pathname.startsWith("/projects")}
          />

          {user?.role === "ADMIN" ? (
            <NavItem
              label="Clients"
              onClick={() => {
                navigate("/clients");
              }}
              active={location.pathname.startsWith("/clients")}
            />
          ) : null}

          {user?.role === "ADMIN" ? (
            <NavItem
              label="Users"
              onClick={() => {
                navigate("/users");
              }}
              active={location.pathname.startsWith("/users")}
            />
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/4 hover:text-slate-300"
            >
              <Bell size={18} />

              <span className="absolute right-1 text-white text-[10px] text-center flex items-center justify-center top-0 h-4 w-4 rounded-full bg-indigo-500">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            </button>

            <NotificationDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div className="mx-2 hidden h-6 w-px bg-white/5 sm:block" />

          <ProfileMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
