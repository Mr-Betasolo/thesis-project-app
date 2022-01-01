import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PrivateWrapper from "./pages/PrivateRoute/PrivateWrapper";
import DashBoard from "./pages/PrivateRoute/DashBoard/DashBoard";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
