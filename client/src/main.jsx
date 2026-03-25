import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import {
  UnifyIntentClient,
  UnifyIntentProvider,
} from '@unifygtm/intent-react';

const writeKey = 'wk_SYSpUbBb_8jcxAiRjQfBPZdqThAiHE5vdygBJw7ZG';

const config = {
  autoPage: true,
  autoIdentify: false,
};

const intentClient = new UnifyIntentClient(writeKey, config);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UnifyIntentProvider intentClient={intentClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnifyIntentProvider>
  </React.StrictMode>
);
