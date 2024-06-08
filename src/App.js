import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Items from "./components/Items";
import Transactions from "./components/Transactions";
import Types from "./components/Types";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/items">Barang</Link>
            </li>
            <li>
              <Link to="/transactions">Transaksi</Link>
            </li>
            <li>
              <Link to="/types">Jenis Barang</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/items" element={<Items />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/types" element={<Types />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
