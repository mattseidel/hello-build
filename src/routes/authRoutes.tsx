import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PublicrouteProps {
  children: React.ReactNode | React.ReactNode[];
}

export const PublicRoute = ({ children }: PublicrouteProps) => {
  const { user } = useAuth();
  console.log(user);
  
  if (user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
