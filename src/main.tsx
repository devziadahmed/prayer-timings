import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n.ts";
import App from "./App.tsx";
import { StyleSheetManager } from "styled-components";
import ColorProvider from "./context/ColorContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorProvider>
      <StyleSheetManager shouldForwardProp={() => true}>
        <App />
      </StyleSheetManager>
    </ColorProvider>
  </React.StrictMode>
);
