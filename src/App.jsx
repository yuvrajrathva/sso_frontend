import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/forgot-password" element={<div>Forgot Password</div>} /> */}
          {/* <Route path="/reset-password" element={<div>Reset Password</div>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
