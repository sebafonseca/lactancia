import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contacto" element={<ContactPage />} />
    </Routes>
  );
}
