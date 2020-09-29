import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import apollo from "./apollo.json";

ReactDOM.render(
  <React.StrictMode>
    <App apollos={apollo} />
  </React.StrictMode>,
  document.getElementById("root")
);
