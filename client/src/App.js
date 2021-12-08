import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ThemeProvider from "./components/MuiTheme/MuiTheme";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
