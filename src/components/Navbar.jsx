import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';


const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <Link to="/products">Products</Link>}
      {token && <Link to="/add-product">Add Product</Link>} 
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
