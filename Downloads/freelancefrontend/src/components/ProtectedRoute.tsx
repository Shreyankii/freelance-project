import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = localStorage.getItem("freelanceMatch_user");
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
