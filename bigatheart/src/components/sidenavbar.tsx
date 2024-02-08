import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import NavBar from "./navbar";
export const userbuttons = [
  "Announcements",
  "Submit attendance",
  "Certificate",
];
export const adminbuttons = [];
const Sidenavbar = (prop: {
  children: any;
  changepagenumber: (number: number) => void;
}) => {
  const drawerWidth = 240;
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Clipped drawer
        </Typography>
      </Toolbar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {userbuttons.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => prop.changepagenumber(index)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {adminbuttons.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() =>
                    prop.changepagenumber(index + userbuttons.length)
                  }
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {prop.children}
      </Box>
    </Box>
  );
};

export default Sidenavbar;
