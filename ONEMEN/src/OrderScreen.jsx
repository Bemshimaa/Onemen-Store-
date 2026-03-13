import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import Container from "./container";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);

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

    if (user) {
      fetchOrder();
    }
  }, [orderId, user]);

  if (loading) return <div className="pt-40 text-center font-['Bebas_Neue'] text-2xl tracking-widest">LOADING ORDER...</div>;
  if (error) return <div className="pt-40 text-center text-red-500 font-['Oswald'] uppercase tracking-widest">{error}</div>;

  return (
    <section className="pt-32 pb-20">
      <Container>
        <h1 className="text-[2rem] font-['Bebas_Neue'] mb-8 tracking-widest uppercase">Order {order._id}</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">SHIPPING</h2>
              <div className="text-gray-600 flex flex-col gap-1">
                <p><strong>Name:</strong> {order.user?.name || 'User'}</p>
                <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
                <p><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
              </div>
              <div className={`mt-4 p-3 font-['Oswald'] uppercase text-sm tracking-widest ${order.isDelivered ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">PAYMENT</h2>
              <p className="text-gray-600"><strong>Method:</strong> {order.paymentMethod}</p>
              <div className={`mt-4 p-3 font-['Oswald'] uppercase text-sm tracking-widest ${order.isPaid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">ORDER ITEMS</h2>
              <div className="flex flex-col gap-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      <Link to={`/Products/${item.product}`} className="hover:underline font-['Oswald'] uppercase text-sm">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm font-['Oswald']">
                      {item.qty} x ₦{item.price.toLocaleString()} = ₦{(item.qty * item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {order.trackingNumber && (
              <div className="bg-white p-6 border border-gray-200">
                <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">TRACKING</h2>
                <div className="flex flex-col gap-4">
                  <p className="font-['Oswald'] text-sm uppercase tracking-widest text-gray-600">
                    <strong className="text-black">Tracking Number:</strong> {order.trackingNumber}
                  </p>
                  <a 
                    href={`https://gigl.online/track-order?order_id=${order.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white text-center py-3 font-['Bebas_Neue'] tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    TRACK ON GIGL WEBSITE
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black text-white p-6 h-fit sticky top-32">
            <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-6">ORDER SUMMARY</h2>
            {/* ... (existing summary items) */}
            <div className="flex flex-col gap-4 text-sm font-['Oswald'] uppercase tracking-widest">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Items</span>
                <span>₦{(order.totalPrice + order.discount - order.shippingPrice - order.taxPrice).toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between border-b border-gray-800 pb-3 text-green-400">
                  <span>Discount ({order.couponCode})</span>
                  <span>- ₦{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Shipping</span>
                <span>₦{order.shippingPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Tax</span>
                <span>₦{order.taxPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span>₦{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            {/* ... (existing buttons) */}
            {!order.isPaid && (
              /* ... Paystack Button logic ... */
              <div className="mt-8">
                {!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ? (
                  <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 font-['Oswald'] text-xs uppercase tracking-widest">
                    <p className="font-bold mb-1">Payment System Error:</p>
                    Paystack Public Key is missing. Please add 
                    <code className="bg-black/50 px-1 mx-1">VITE_PAYSTACK_PUBLIC_KEY</code> 
                    to your <code className="bg-black/50 px-1">ONEMEN/.env</code> file.
                  </div>
                ) : (
                  <PaystackButton
                    className="w-full bg-[#09A5DB] text-white py-4 font-['Bebas_Neue'] tracking-widest text-lg hover:bg-[#0781ab] transition-colors"
                    publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}
                    email={user.email}
                    amount={Math.round(order.totalPrice * 100)}
                    currency="NGN"
                    metadata={{
                      name: user.name,
                      order_id: order._id,
                    }}
                  text="PAY WITH PAYSTACK"
                  onSuccess={(reference) => {
                    const updatePayment = async () => {
                      try {
                        const config = {
                          headers: {
                            Authorization: `Bearer ${user.token}`,
                          },
                        };
                        await axios.put(
                          `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/pay`,
                          {
                            id: reference.reference,
                            status: reference.status,
                            update_time: new Date().toISOString(),
                            email_address: user.email,
                          },
                          config
                        );
                        window.location.reload();
                      } catch (err) {
                        console.error("Error updating payment status:", err);
                      }
                    };
                    updatePayment();
                  }}
                  onClose={() => alert("Transaction was not completed")}
                />
              )}
            </div>
            )}

            {user && user.isAdmin && order.isPaid && (
              <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase opacity-60">Admin: Update Tracking Number</label>
                  <input 
                    type="text"
                    placeholder="Enter GIGL Waybill Number"
                    className="bg-zinc-900 border border-zinc-800 p-3 text-xs focus:outline-none focus:border-white transition-colors"
                    defaultValue={order.trackingNumber}
                    onBlur={async (e) => {
                      const trackingNumber = e.target.value;
                      if (!trackingNumber) return;
                      try {
                        const config = {
                          headers: {
                            Authorization: `Bearer ${user.token}`,
                          },
                        };
                        await axios.put(
                          `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/tracking`,
                          { trackingNumber },
                          config
                        );
                        alert("Tracking number updated!");
                        window.location.reload();
                      } catch (err) {
                        alert(err.response && err.response.data.message ? err.response.data.message : err.message);
                      }
                    }}
                  />
                </div>
                
                {!order.isDelivered && (
                  <button
                    onClick={async () => {
                      if (window.confirm("Mark this order as delivered?")) {
                        try {
                          const config = {
                            headers: {
                              Authorization: `Bearer ${user.token}`,
                            },
                          };
                          await axios.put(
                            `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/deliver`,
                            {},
                            config
                          );
                          window.location.reload();
                        } catch (err) {
                          alert(err.response && err.response.data.message ? err.response.data.message : err.message);
                        }
                      }
                    }}
                    className="w-full bg-white text-black py-4 font-['Bebas_Neue'] tracking-widest text-lg hover:bg-gray-200 transition-colors"
                  >
                    MARK AS DELIVERED
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
