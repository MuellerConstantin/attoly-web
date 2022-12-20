import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouteProtector({ children }) {
  const principal = useSelector((state) => state.auth.principal);
  const refreshExpiresAt = useSelector((state) => state.auth.refreshExpiresAt);

  return principal && Date.now() < refreshExpiresAt ? (
    children
  ) : (
    <Navigate to="/logout" />
  );
}
