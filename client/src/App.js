import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ThemeProvider from "./components/MuiTheme/MuiTheme";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PrivateWrapper from "./pages/PrivateRoute/PrivateWrapper";
import DashBoard from "./pages/PrivateRoute/DashBoard/DashBoard";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route element={<PrivateWrapper />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
