import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Customer from "./pages/Customer"
import Kitchen from "./pages/Kitchen"
import Manager from "./pages/Manager"
import Waiter from './pages/Waiter';
import Staff from './pages/Staff';
import KitchenOrder from './pages/KitchenOrder';
import { Box, Button } from '@mui/material';
import CustomerCategory from './pages/CustomerCategory';

function App() {
  const navigate = useNavigate();
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Box sx={{background:'grey'}}> nav bar
      <Button onClick={() => navigate('/')}> home </Button>
      <Button onClick={() => navigate('/staff')}> staff </Button>
      <Button onClick={() => navigate('/customer')}> customer </Button>
      <Button onClick={() => navigate('/kitchen')}> kitechen </Button>
      <Button onClick={() => navigate('/manager')}> manager </Button>
      <Button onClick={() => navigate('/waiter')}> waiter </Button>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/kitchen/:id" element={<KitchenOrder />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:category" element={<CustomerCategory />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/waiter" element={<Waiter />} />
      </Routes>

    </div>
  );
}

export default App;
