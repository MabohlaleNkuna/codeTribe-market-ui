import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productSlice';


const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !description || !price || !category || !imageURL) {
      setError('All fields are required.');
      return;
    }

    try {
      const newProduct = { name, description, price, category, imageURL };
      await dispatch(addProduct(newProduct)).unwrap();
      setProducts([...products, newProduct]); // Add product to local state
      setSuccess('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImageURL('');
    } catch (error) {
      console.error(error);
      setError('Failed to add product!');
    }
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
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
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          required 
        />
        <button type="submit">Add Product</button>
      </form>

      <div className="products-display">
        <h3>Added Products</h3>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.imageURL} alt={product.name} className="product-image" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
            {/* Add Update button functionality as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
