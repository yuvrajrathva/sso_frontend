import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerificationCode from "./pages/VerificationCode";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification-code" element={<VerificationCode />} />
            {/* <Route path="/forgot-password" element={<div>Forgot Password</div>} /> */}
            {/* <Route path="/reset-password" element={<div>Reset Password</div>} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
