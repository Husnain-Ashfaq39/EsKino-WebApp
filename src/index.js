import React from "react";
import ReactDOM from "react-dom/client";

// import { BrowserRouter } from "react-router-dom";
import Approuter from "./approuter";

// import { App } from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
//CSS & Bootstrap
import "./assets/css/style.css";
//  import "./assets/js/bootstrap.bundle.min.js";
import "./assets/css/select2.min.css";
//Font Awesome
// import "./assets/plugins/fontawesome/css/fontawesome.min.css";
// import "./assets/plugins/fontawesome/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import "bootstrap/dist/css/bootstrap.min.css";
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

root.render(
  <QueryClientProvider client={queryClient}>
    <Approuter />
  </QueryClientProvider>
);
// ReactDOM.render(
//     <BrowserRouter>
//       <Approuter />
//     </BrowserRouter>,
//     document.getElementById("root")
//   );

// ReactDOM.render(
//   <Approuter/>,
// document.getElementById('root')
// );
