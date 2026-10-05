import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import ServiceLandingPage from "../pages/ServiceLandingPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/asesoria-lactancia-melo" element={<ServiceLandingPage variant="melo" />} />
      <Route
        path="/asesoria-lactancia-online-uruguay"
        element={<ServiceLandingPage variant="online" />}
      />
    </Routes>
  );
}
