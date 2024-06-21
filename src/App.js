import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Items from "./pages/Items";
import Transactions from "./pages/Transactions";
import Types from "./pages/Types";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";

function App() {
  return (
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/items">Barang</Link>
    //         </li>
    //         <li>
    //           <Link to="/transactions">Transaksi</Link>
    //         </li>
    //         <li>
    //           <Link to="/types">Jenis Barang</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //     <Routes>
    //       <Route path="/items" element={<Items />} />
    //       <Route path="/transactions" element={<Transactions />} />
    //       <Route path="/types" element={<Types />} />
    //     </Routes>
    //   </div>
    // </Router>
    <div className="Wrapper">
      <Header/>
      <Home/>
      <Footer/>
      <SideNav/>
    </div>
  );
}

export default App;
