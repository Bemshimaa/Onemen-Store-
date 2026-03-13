import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from './button';

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-backend.onrender.com').replace(/\/$/, '');
      const { data } = await axios.get(`${apiUrl}/api/products`);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-backend.onrender.com').replace(/\/$/, '');
        await axios.delete(`${apiUrl}/api/products/${id}`, config);
        setMessage('Product deleted successfully');
        fetchProducts();
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-backend.onrender.com').replace(/\/$/, '');
      const { data } = await axios.post(`${apiUrl}/api/products`, {}, config);
      fetchProducts();
      // In a real app, you would navigate to the edit screen here
      setMessage(`New product created: ${data.name}`);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="pt-32 px-4 max-w-[1280px] mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-['Bebas_Neue'] tracking-widest uppercase">Products Management</h1>
        <Button onClick={createProductHandler} className="px-6 py-2">CREATE PRODUCT</Button>
      </div>

      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-20 font-['Bebas_Neue'] text-2xl tracking-widest opacity-50 uppercase">Loading Products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-['Oswald']">
            <thead>
              <tr className="bg-black text-white uppercase text-left tracking-widest text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">NAME</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">BRAND</th>
                <th className="p-4">STOCK</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 uppercase text-sm tracking-wide">
                  <td className="p-4">{product._id}</td>
                  <td className="p-4 font-bold">{product.name}</td>
                  <td className="p-4">₦{product.price.toLocaleString()}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4">{product.countInStock}</td>
                  <td className="p-4 flex gap-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-blue-600 hover:underline">EDIT</button>
                    </Link>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:underline">DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
