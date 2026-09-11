import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
