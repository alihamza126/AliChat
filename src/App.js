import React, { useContext, useEffect } from "react";
import './app.scss'
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import { UserAuthContext } from "./context/UserAuthContext";

function App() {
  
  const { currentuser } = useContext(UserAuthContext);
 
  return (
    <BrowserRouter>
      <Routes path="/">
        {/* <Route index path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} /> */}
        <Route index path="/" element={currentuser?<Home />:<Login/>} />
        <Route path="signup" element={currentuser?<Home />:<Signup />} />
        <Route path="login" element={currentuser?<Home />:<Login />} />
        <Route path="*" element={currentuser?<Home />:<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
