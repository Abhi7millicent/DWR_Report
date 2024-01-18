import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { GetSessionItem } from "./utils/SessionStorage";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!GetSessionItem("status")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
