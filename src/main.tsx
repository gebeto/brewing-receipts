import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { HashRouter, Routes, Route } from "react-router";

import { WeightsProvider } from "./components/weights";
import { BottomNavigationBar } from "./components/BottomNavigationBar";

import { Receipt } from "./pages/Receipt";
import { Weights } from "./pages/Weights";
import { MainPage } from "./pages/main";

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
        <HashRouter>
          <CssBaseline />
          <WeightsProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/receipt/:id" element={<Receipt />} />
              <Route path="/weights" element={<Weights />} />
            </Routes>
            <BottomNavigationBar />
          </WeightsProvider>
        </HashRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
