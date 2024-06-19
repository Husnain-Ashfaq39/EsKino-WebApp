import React from "react";
import ReactDOM from "react-dom/client";
import Approuter from "./approuter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/select2.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "./sass/index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import colors from "./colorTheme.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

// Color Theme
document.documentElement.style.setProperty("--primary-color", colors.primary);
document.documentElement.style.setProperty(
  "--secondary-color",
  colors.secondary
);
document.documentElement.style.setProperty("--tertiary-color", colors.tertiary);
document.documentElement.style.setProperty("--dark-color", colors.dark);
document.documentElement.style.setProperty("--light-blue", colors.lightBlue);
document.documentElement.style.setProperty(
  "--primary-blue",
  colors.primaryBlue
);

document.documentElement.style.setProperty(
  "--darkBlue",
  colors.darkBlue
);

// Inject global font style
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  * {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    
  }
`;
document.head.appendChild(globalStyle);

root.render(
  <QueryClientProvider client={queryClient}>
    <Approuter />
  </QueryClientProvider>
);
