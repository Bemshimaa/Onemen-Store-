import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "./container";

export default function MyOrders() {
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
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/myorders`, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <div className="pt-40 text-center font-['Bebas_Neue'] text-2xl tracking-widest">LOADING ORDERS...</div>;
  if (error) return <div className="pt-40 text-center text-red-500 font-['Oswald'] uppercase tracking-widest">{error}</div>;

  return (
    <section className="pt-32 pb-20">
      <Container>
        <h1 className="text-[2.5rem] font-['Bebas_Neue'] mb-8 tracking-widest uppercase">MY ORDERS</h1>
        
        {orders.length === 0 ? (
          <div className="bg-gray-50 p-10 text-center border border-dashed border-gray-300">
            <p className="font-['Oswald'] uppercase tracking-widest text-gray-500">You have no orders yet.</p>
            <Link to="/Products" className="mt-4 inline-block text-black underline font-['Oswald'] uppercase text-sm tracking-widest hover:text-gray-600 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black text-white font-['Bebas_Neue'] tracking-widest text-lg">
                <tr>
                  <th className="p-4 border-b border-gray-800">ID</th>
                  <th className="p-4 border-b border-gray-800">DATE</th>
                  <th className="p-4 border-b border-gray-800">TOTAL</th>
                  <th className="p-4 border-b border-gray-800">PAID</th>
                  <th className="p-4 border-b border-gray-800">DELIVERED</th>
                  <th className="p-4 border-b border-gray-800"></th>
                </tr>
              </thead>
              <tbody className="font-['Oswald'] uppercase text-sm tracking-wider">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                    <td className="p-4 text-xs font-mono">{order._id}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-bold">₦{order.totalPrice.toLocaleString()}</td>
                    <td className="p-4">
                      {order.isPaid ? (
                        <span className="text-green-600 bg-green-50 px-2 py-1 border border-green-200">
                          {new Date(order.paidAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-red-600 bg-red-50 px-2 py-1 border border-red-200">NOT PAID</span>
                      )}
                    </td>
                    <td className="p-4">
                      {order.isDelivered ? (
                        <span className="text-green-600 bg-green-50 px-2 py-1 border border-green-200">
                          {new Date(order.deliveredAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-orange-600 bg-orange-50 px-2 py-1 border border-orange-200">PENDING</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link to={`/order/${order._id}`} className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors inline-block text-xs">
                        DETAILS
                      </Link>
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
