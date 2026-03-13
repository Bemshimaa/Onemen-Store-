import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from './container';

export default function OrderListScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const apiUrl = (import.meta.env.VITE_API_URL || 'https://onemen-store.onrender.com').replace(/\/$/, '');
        const { data } = await axios.get(`${apiUrl}/api/orders`, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <div className="pt-40 text-center font-['Bebas_Neue'] text-2xl tracking-widest uppercase opacity-50">Loading Orders...</div>;
  if (error) return <div className="pt-40 text-center text-red-500 font-['Oswald'] uppercase tracking-widest p-4">{error}</div>;

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <Container>
        <h1 className="text-[2.5rem] font-['Bebas_Neue'] mb-8 tracking-widest uppercase">Admin: All Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-gray-50 p-10 text-center border border-dashed border-gray-300 font-['Oswald'] uppercase tracking-widest text-gray-500">
            No orders found in the system.
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse font-['Oswald']">
              <thead className="bg-black text-white tracking-widest text-sm uppercase">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">USER</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">TOTAL</th>
                  <th className="p-4">PAID</th>
                  <th className="p-4">DELIVERED</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody className="uppercase text-xs tracking-wider">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                    <td className="p-4 font-mono">{order._id}</td>
                    <td className="p-4 font-bold">{order.user ? order.user.name : 'DELETED USER'}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">₦{order.totalPrice.toLocaleString()}</td>
                    <td className="p-4">
                      {order.isPaid ? (
                        <span className="text-green-600 bg-green-50 px-2 py-1 border border-green-100 inline-block w-24 text-center">
                          {new Date(order.paidAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-red-500 bg-red-50 px-2 py-1 border border-red-100 inline-block w-24 text-center">NO</span>
                      )}
                    </td>
                    <td className="p-4">
                      {order.isDelivered ? (
                        <span className="text-green-600 bg-green-50 px-2 py-1 border border-green-100 inline-block w-24 text-center">
                          {new Date(order.deliveredAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-orange-500 bg-orange-50 px-2 py-1 border border-orange-100 inline-block w-24 text-center">NO</span>
                      )}
                    </td>
                    <td className="p-4 space-x-2">
                        <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">DETAILS</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </section>
  );
}
