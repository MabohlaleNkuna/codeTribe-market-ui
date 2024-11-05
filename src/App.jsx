import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import './app.css'; 

const App = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('currentPath', location.pathname);
  }, [location]);

  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Provider>
  );
};

const AppWrapper = () => {
  // Get the path from local storage
  const savedPath = localStorage.getItem('currentPath') || '/login';

  return (
    <Router initialEntries={[savedPath]}>
      <App />
    </Router>
  );
};

export default AppWrapper;
