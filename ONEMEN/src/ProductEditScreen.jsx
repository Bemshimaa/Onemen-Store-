import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "./button";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-store.onrender.com').replace(/\/$/, '');
        const { data } = await axios.get(`${apiUrl}/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-store.onrender.com').replace(/\/$/, '');
      await axios.put(
        `${apiUrl}/api/products/${productId}`,
        { name, price, image, brand, category, countInStock, description },
        config
      );
      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/admin/productlist"), 2000);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="pt-32 px-4 max-w-[800px] mx-auto min-h-screen font-['Oswald']">
      <Link to="/admin/productlist" className="text-black underline uppercase tracking-widest text-sm mb-8 inline-block">
        Go Back
      </Link>

      <h1 className="text-4xl font-['Bebas_Neue'] tracking-widest uppercase mb-8 text-center">Edit Product</h1>

      {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-20 font-['Bebas_Neue'] text-2xl tracking-widest opacity-50 uppercase">Loading Product...</div>
      ) : (
        <form onSubmit={submitHandler} className="bg-white p-8 border border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black uppercase text-sm"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Price (₦)</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Image URL</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="mb-4 text-xs italic text-gray-500">
            Note: You can use relative paths like "/images/polo-1.jpg" if the image is in the public folder.
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Brand</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black uppercase text-sm"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Count In Stock</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Category</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black uppercase text-sm"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 uppercase tracking-widest text-sm mb-2">Description</label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm uppercase h-32"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <Button type="submit" className="w-full py-4 font-['Bebas_Neue'] tracking-widest text-xl">
            UPDATE PRODUCT
          </Button>
        </form>
      )}
    </div>
  );
}
