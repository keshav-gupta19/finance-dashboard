import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar/navbar";
import Dashboard from "./pages/Dashboard/dashboard";
import Predictions from "./pages/Predictions/Prediction";
// Could not find a declaration file for module '../src/pages/Navbar/navbar.jsx'. 'd:/FinanceApp/finance-app/src/pages/Navbar/navbar.jsx' implicitly has an 'any' type.
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
