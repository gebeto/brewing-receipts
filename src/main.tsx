import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Toolbar,
  // MenuIcon,
  IconButton,
  Box,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Add, Scale, Search } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
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
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
