import {
  Route,
  Routes,
} from "react-router-dom";
import { PublicRoute } from "./routes/authRoutes";
import { HomeView } from "./views/HomeView";
import { LoginView } from "./views/LoginView";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginView />
          </PublicRoute>
        }
      />
    </Routes>
  );
}