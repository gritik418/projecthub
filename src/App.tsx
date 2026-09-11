import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Login from "./pages/auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
