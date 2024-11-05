import React, { useState } from 'react';  
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      navigate('/products'); 
    } catch (error) {
      setError('Login failed. Please check your credentials.'); 
    }
  };
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
