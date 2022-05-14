import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,34,214,1) 0%, rgba(33,195,222,1) 35%, rgba(114,109,209,1) 67%, rgba(169,8,180,1) 100%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">DemoApp</Typography>
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                color="warning"
                sx={{ margin: 1, borderRadius: 5 }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/signup"
                variant="contained"
                color="warning"
                sx={{ margin: 1, borderRadius: 5 }}
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {reactLocalStorage.getObject("name").name}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/");
                      dispatch(authActions.logout());
                      reactLocalStorage.remove("id");
                      reactLocalStorage.remove("name");
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
