import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./router/Routes.jsx";
import { applyRouteSeo } from "./seo.js";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    applyRouteSeo(location.pathname);
  }, [location.pathname]);

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

  return (
    <>
      <AppRoutes />
      <Analytics route={location.pathname} path={location.pathname} />
    </>
  );
}
