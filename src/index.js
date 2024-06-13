import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import "./pages/Auth/authOpration/register/register.css";
import "./css/components/alerts.css";
import "./css/components/loading.css";
import "./css/components/google.css";
import "./css/components/form.css";
import "./components/dashborad/bars.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WindowContext>
        <MenuContext>
          <App />
        </MenuContext>
      </WindowContext>
    </BrowserRouter>
  </React.StrictMode>
);
