import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./router/Routes.jsx";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return <AppRoutes />;
}
