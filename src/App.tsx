import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/ProjectDetails";
import { useSelector } from "react-redux";
import { selectUser } from "./features/auth/auth.slice";
import Clients from "./pages/client/Clients";
import UsersPage from "./pages/users/Users";

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {user && user.role == "ADMIN" ? (
            <Route path="/clients" element={<Clients />} />
          ) : null}

          {user && user.role == "ADMIN" ? (
            <Route path="/users" element={<UsersPage />} />
          ) : null}

          {user && user.role !== "DEVELOPER" ? (
            <Route path="/projects" element={<Projects />} />
          ) : null}

          {user && user.role !== "DEVELOPER" ? (
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          ) : null}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
