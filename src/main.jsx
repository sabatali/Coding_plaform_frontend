import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import { TableProvider } from "./Context/TableContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { AIProvider } from "./Context/AIContext.jsx";

ReactDOM.render(
  <>
    <Router>
      <>
        <AIProvider>
        <AuthProvider>
        <TableProvider>
        <App />
        </TableProvider>
        </AuthProvider>
        </AIProvider>
      </>
    </Router>
  </>,
  document.getElementById("root")
);
