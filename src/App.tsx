import React from "react";

import { MemoryRouter as Router, Routes, Route, Link } from "react-router";

import logo from "./assets/coffee.png";
import "./App.css";

import { receipts } from "./receipts";
import { Receipt } from "./Receipt";

function App() {
  return (
    <Router initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://react.dev" target="_blank">
                  <img src={logo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Brewing Receipts</h1>
              <div>
                {receipts.map((receipt, index) => (
                  <li key={index}>
                    <Link to={`/receipt/${index}`}>{receipt.title}</Link>
                  </li>
                ))}
              </div>
            </>
          }
        />
        <Route
          path="/receipt/:id"
          element={
            <>
              <Link to="/">Back</Link>
              <Receipt receipt={receipts[0]} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
