import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./components/App/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
