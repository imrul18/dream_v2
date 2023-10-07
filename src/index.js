import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AuthService from "./service/AuthService";

const recall = async () => {
  if (localStorage.getItem("refreshToken")) {
    setTimeout(
      async () => {
        await AuthService.refreshToken();
        localStorage.getItem("refreshToken") && recall();
      },
      JSON.parse(localStorage.getItem("refreshTime")) - new Date().getTime() < 0
        ? 0
        : JSON.parse(localStorage.getItem("refreshTime")) - new Date().getTime()
    );
  }
};

recall();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
