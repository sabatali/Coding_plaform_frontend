import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AIProvider } from "./Context/AIContext.jsx";
import { TableProvider } from "./Context/TableContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { TransactionProvider } from "./Expense/TransactionContext.jsx";
import "./index.css";

ReactDOM.render(
  <>
    <Router>
      <>
        <AIProvider>
        <AuthProvider>
        <TableProvider>
        <TransactionProvider>
        <App />
        </TransactionProvider>
       
        </TableProvider>
        </AuthProvider>
        </AIProvider>
      </>
    </Router>
  </>,
  document.getElementById("root")
);
