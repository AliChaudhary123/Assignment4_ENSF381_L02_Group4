import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import CoursePage from "./CoursePage";
import LoginForm from "./LoginForm";
import SignupPage from "./SignupPage";

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
