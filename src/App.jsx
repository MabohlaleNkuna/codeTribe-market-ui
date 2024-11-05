// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProtectedRoute from './components/ProtectedRoute'; // Make sure this is correctly set up

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root path to login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protecting Product Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
