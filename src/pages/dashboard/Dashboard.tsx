import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.slice";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import PMDashboard from "../../components/Dashboard/PMDashboard";
import DeveloperDashboard from "../../components/Dashboard/DeveloperDashboard";

export default function Dashboard() {
  const user = useSelector(selectUser);

  if (!user) return null;

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "PROJECT_MANAGER":
      return <PMDashboard />;

    case "DEVELOPER":
      return <DeveloperDashboard />;

    default:
      return null;
  }
}
