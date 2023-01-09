import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RouteProtector from "./components/organisms/RouteProtector";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import VerifyUser from "./pages/VerifyUser";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import Management from "./pages/Management";
import GetStarted from "./pages/GetStarted";
import Redirect from "./pages/Redirect";
import NotFound from "./pages/NotFound";
import OAuth2Redirect from "./pages/OAuth2Redirect";

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
      <Route
        path="/settings"
        element={
          <RouteProtector>
            <Settings />
          </RouteProtector>
        }
      />
      <Route
        path="/management"
        element={
          <RouteProtector>
            <Management />
          </RouteProtector>
        }
      />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/redirect/:tag" element={<Redirect />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
    </Routes>
  );
}
