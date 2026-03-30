import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import DevAdminPage from "../pages/DevAdminPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuth } from "../services/auth.jsx";

export default function AppRoutes() {
  const { roles } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={[roles.ROLE_CLIENT]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[roles.ROLE_ADMIN]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dev-admin"
        element={
          <ProtectedRoute allowedRoles={[roles.ROLE_DEV_ADMIN]}>
            <DevAdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
