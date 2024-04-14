import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";

const metaTag = document.createElement("meta");
metaTag.name = "viewport";
metaTag.content = "width=device-width, initial-scale=1.0";
document.head.appendChild(metaTag);

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <App />
    </DevSupport>
  </React.StrictMode>,
  root,
);
