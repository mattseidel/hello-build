import { createBrowserRouter } from "react-router-dom";
import { HomeView } from "../views/HomeView";

// import { LoginView } from "../views/LoginView";

// import { RegisterView } from "../views/RegisterView";
export const routes = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: <LoginView />,
  // },
  // {
  //   path: "/register",
  //   element: <RegisterView />,
  // },
  {
    path: "/favorites",
    element: <HomeView />,
  },
  {
    path: "/",
    element: <HomeView />,
  },
]);
