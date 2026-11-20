import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FreeScrolling from "./pages/FreeScrolling";
import "./styles.css";

function Root() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/scrolling") return <FreeScrolling />;
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
