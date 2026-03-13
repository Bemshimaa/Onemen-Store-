import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "./container";
import { PaystackButton } from "react-paystack";

function OrderDetailsModal({ orderId, onClose, user }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, config);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    if (user && orderId) {
      fetchOrder();
    }
  }, [orderId, user]);

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-10 border border-black shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:opacity-50 transition-opacity"
        >
          <i className="fas fa-times"></i>
        </button>

        {loading ? (
          <div className="py-20 text-center font-['Bebas_Neue'] text-2xl tracking-widest animate-pulse">LOADING ORDER DETAILS...</div>
        ) : error ? (
          <div className="py-20 text-center text-red-500 font-['Oswald'] uppercase tracking-widest">{error}</div>
        ) : order && (
          <div className="flex flex-col gap-8">
            <h1 className="text-[2rem] font-['Bebas_Neue'] tracking-widest border-b border-gray-100 pb-4">
              ORDER DETAILS
            </h1>

            <div className="grid md:grid-cols-2 gap-8 text-black">
              {/* Shipping & Payment */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-3 uppercase">Shipping Details</h2>
                  <div className="font-['Oswald'] uppercase text-sm tracking-widest leading-relaxed text-gray-600">
                    <p><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                    <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
                  </div>
                  <div className={`mt-4 inline-block px-3 py-1 font-['Oswald'] uppercase text-[10px] tracking-[0.2em] ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.isDelivered ? 'DELIVERED' : 'PENDING DELIVERY'}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-3 uppercase">Payment</h2>
                  <p className="font-['Oswald'] text-xs tracking-widest text-gray-600 uppercase">Method: {order.paymentMethod}</p>
                  <div className={`mt-4 inline-block px-3 py-1 font-['Oswald'] uppercase text-[10px] tracking-[0.2em] ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {order.isPaid ? 'PAID' : 'NOT PAID'}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-3 uppercase">Items Ordered</h2>
                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {order.orderItems?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      <div className="flex-grow">
                        <p className="font-['Bebas_Neue'] text-lg tracking-tight leading-none uppercase">{item.name}</p>
                        <p className="font-['Oswald'] text-[10px] tracking-widest text-gray-500 mt-1">{item.qty} x ₦{item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Pay Button */}
            <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="w-full md:w-1/2 flex flex-col gap-2 font-['Oswald'] text-xs tracking-widest uppercase text-gray-600">
                 <div className="flex justify-between">
                   <span>Items Total</span>
                   <span>₦{(order.totalPrice - (order.shippingPrice || 0) + (order.discount || 0) - (order.taxPrice || 0)).toLocaleString()}</span>
                 </div>
                 {order.discount > 0 && (
                   <div className="flex justify-between text-green-600">
                     <span>Discount</span>
                     <span>- ₦{order.discount?.toLocaleString()}</span>
                   </div>
                 )}
                 <div className="flex justify-between">
                   <span>Shipping</span>
                   <span>₦{order.shippingPrice?.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2 text-black">
                   <span>Total</span>
                   <span>₦{order.totalPrice?.toLocaleString()}</span>
                 </div>
              </div>

              {!order.isPaid && (
                <div className="w-full md:w-auto">
                    {import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ? (
                      <PaystackButton
                        className="w-full md:w-[250px] bg-black text-white py-4 font-['Bebas_Neue'] tracking-widest text-lg hover:opacity-80 transition-opacity"
                        publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
                        email={user.email}
                        amount={Math.round(order.totalPrice * 100)}
                        currency="NGN"
                        onSuccess={() => window.location.reload()}
                        text="PAY NOW"
                      />
                    ) : (
                      <p className="text-red-500 text-[10px] tracking-widest uppercase">Payment Key Missing</p>
                    )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
            <Link to="/Products/69b2e9f4e9ed06091e034f63" className="mt-4 inline-block text-black underline font-['Oswald'] uppercase text-sm tracking-widest hover:text-gray-600 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black text-white font-['Bebas_Neue'] tracking-widest text-lg">
                <tr>
                  <th className="p-4 border-b border-gray-800">ORDER ID</th>
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
                      <button 
                        onClick={() => setSelectedOrderId(order._id)}
                        className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors inline-block text-xs font-['Bebas_Neue'] tracking-widest"
                      >
                        DETAILS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>

      {/* Modal Integration */}
      {selectedOrderId && (
        <OrderDetailsModal 
          orderId={selectedOrderId} 
          user={user} 
          onClose={() => setSelectedOrderId(null)} 
        />
      )}
    </section>
  );
}
