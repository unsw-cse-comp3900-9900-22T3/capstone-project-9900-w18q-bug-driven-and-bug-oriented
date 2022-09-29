import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import Kitchen from "./pages/Kitchen"
import Manager from "./pages/Manager"
import Waiter from './pages/Waiter';

function App() {
  return (
    <div style={{ height: "100%", width: "100%" }}>

      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/Waiter" element={<Waiter />} />
      </Routes>

    </div>
  );
}

export default App;
