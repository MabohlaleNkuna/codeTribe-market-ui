// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/products', {
        name,
        description,
        price,
        category,
        imageURL,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product added successfully!');
      window.location.href = '/products'; // Redirect to products list
    } catch (error) {
      console.error(error);
      alert('Failed to add product!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input 
        type="text" 
        placeholder="Product Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={imageURL} 
        onChange={(e) => setImageURL(e.target.value)} 
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
