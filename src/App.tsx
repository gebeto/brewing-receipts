import { HashRouter as Router, Routes, Route, Link } from "react-router";
import styled from "@emotion/styled";

import logo from "./assets/coffee.png";

import { receipts } from "./receipts";
import { Receipt } from "./Receipt";

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://react.dev" target="_blank">
                  <Logo src={logo} alt="logo" />
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
