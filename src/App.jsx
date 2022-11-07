import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import VerifyUser from "./pages/VerifyUser";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

export default function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/verify-user" element={<VerifyUser />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}
