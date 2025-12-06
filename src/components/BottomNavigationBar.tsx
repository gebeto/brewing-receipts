import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Fab,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Scale, Search } from "@mui/icons-material";
import { receipts } from "../receipts";
import { Link } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export const BottomNavigationBar = () => {
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon />
          </IconButton>
          <StyledFab color="primary" aria-label="add">
            <Scale />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Scale />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="bottom"
        open={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <List>
          {receipts.map((receipt, index) => (
            <ListItemButton
              component={Link}
              to={`/receipt/${index}`}
              key={index}
              onClick={() => {
                setDrawerOpened(false);
              }}
            >
              <ListItemText primary={receipt.title} />
            </ListItemButton>
          ))}
          <Divider />
          <ListItemButton
            component={Link}
            to="/weights"
            onClick={() => setDrawerOpened(false)}
          >
            <ListItemIcon>
              <Scale fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Weights" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};
