import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../theme";
import { useState } from "react";
import { supabase } from "./supabaseClient";

function NavBar() {
  const navigate = useNavigate();
  const pages: string[] = [];
  const navigation: string[] = [];
  const settings = ["Profile", "Logout"];
  const usernavigation = [
    () => navigate("/account"),
    () => supabase.auth.signOut(),
  ];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event: number) => {
    navigate(navigation[event]);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handlePressUserMenuoption = (event: number) => {
    usernavigation[event]();
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link
                to={"/welcome"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  cursor: "pointer",
                  justifyContent: "center",
                }}
              >
                BIGATHEART
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(index)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handlePressUserMenuoption(index)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default NavBar;
