import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, ListItemText } from "@mui/material";
import routes from "../router/routes";
import { LogOutModal } from "./modal";
import logo from "../assets/logo1.jpg";

// Define the youthful and fun color scheme
const colors = {
  turquoise: "#40E0D0", // Turquoise color
  white: "#FFFFFF", // White color for backgrounds
  gray: "#F0F0F0", // Light gray for alternating row background
  black: "#000000", // Black color for text and icons
};

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <img
          src={logo}
          alt="logo"
          className="w-[150px] h-[100px] text-center"
        />
      </Toolbar>
      <Divider />
      <List>
        {routes.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            style={({ isActive }) => ({
              textDecoration: 'none', // Remove underline from active link
              backgroundColor: isActive ? colors.turquoise : 'transparent', // Set background color for active link
              color: colors.black, // Default color for links
            })}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: pathname === item.path ? colors.turquoise : 'transparent',
                  color: pathname === item.path ? colors.white : colors.black,
                  '&:hover': {
                    backgroundColor: colors.gray, // Background color on hover
                    color: colors.black, // Text color on hover
                  },
                }}
              >
                <ListItemIcon>
                  <span
                    style={{
                      color: pathname === item.path ? colors.white : colors.black,
                      '&:hover': {
                        color: colors.black, // Icon color on hover
                      },
                    }}
                  >
                    {item.icon}
                  </span>
                </ListItemIcon>
                <ListItemText primary={item?.content} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: colors.turquoise, // Set AppBar background color to turquoise
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ListItem sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div" sx={{ color: colors.white }}>
              EXAM
            </Typography>
            <LogOutModal />
          </ListItem>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: colors.white, // Set Drawer background color to white
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: colors.white, // Set Drawer background color to white
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
