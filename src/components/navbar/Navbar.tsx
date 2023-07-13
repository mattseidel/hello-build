import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginForm } from "../login/LoginFormV2";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginWithGitHub } from "../../api/v1/auth/LoginWithGitHub";
import { LocalStorage } from "../../classes/localStorage";

const NavBar: React.FC = () => {
  const { user, setUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    const github = new LoginWithGitHub();
    github
      .signOut()
      .then(() => {
        const localStorage = new LocalStorage();
        console.log(user);
        localStorage.remove("user");
        setUser(null);
        navigate("/");
      })
      .catch(console.error);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/favorites")}>
          Favorites
          {/* <Link to="/login"> Favorites</Link> */}
        </Button>
        <pre>

        </pre>
        {user === null ? (
          <>
            <Button color="inherit" onClick={handleMenuOpen}>
              Login
            </Button>
            <Popover
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <LoginForm />
            </Popover>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
