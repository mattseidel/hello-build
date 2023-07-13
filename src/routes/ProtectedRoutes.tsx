import { Navigate, RouteObject } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode | React.ReactNode[];
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/login" />
    }
    return <>{children}</>

}