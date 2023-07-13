/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./db/firebase";
import { routes } from "./routes/AppRouter";
import { ErrorProvider } from "./context/ErrorContext";
import { ToastErrors } from "./components/error/Error";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from './styles/theme/mainTheme';
// import { DarkMode } from "@mui/icons-material";

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <AuthProvider>
      <ErrorProvider>
        <ToastErrors />
        <RouterProvider router={routes} />
      </ErrorProvider>
    </AuthProvider>

  </React.StrictMode>
);
