import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DeveloperLogin from "./pages/DeveloperLogin";
import Signup from "./pages/Signup";
import Consent from "./pages/Consent";
import VerificationCode from "./pages/VerificationCode";
import { AuthProvider } from "./context/AuthContext";
import { AuthProviderSP } from "./context/AuthContextSP";

function App() {
  return (
    <>
      <Router>
        <AuthProviderSP>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/developer/login" element={<DeveloperLogin />} />
          </Routes>
        </AuthProviderSP>
        <AuthProvider>
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification-code" element={<VerificationCode />} />
            <Route path="/consent" element={<Consent />} />
            {/* <Route path="/forgot-password" element={<div>Forgot Password</div>} /> */}
            {/* <Route path="/reset-password" element={<div>Reset Password</div>} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
