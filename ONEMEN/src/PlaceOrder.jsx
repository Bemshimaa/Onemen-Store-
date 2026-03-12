import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "./features/cart/cartslice";
import Button from "./button";
import Container from "./container";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  if (!cart.shippingAddress.address) {
    navigate("/shipping");
  }

  // Calculate prices
  const { coupon } = cart;
  const itemsPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = coupon ? (itemsPrice * coupon.discount) / 100 : 0;
  const shippingPrice = itemsPrice > 100000 ? 0 : 5000;
  const taxPrice = Number((0.05 * (itemsPrice - discount)).toFixed(2));
  const totalPrice = itemsPrice - discount + shippingPrice + taxPrice;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          orderItems: cart.items.map(item => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item.id
          })),
          shippingAddress: cart.shippingAddress,
          paymentMethod: "Paystack",
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          discount: discount,
          couponCode: coupon ? coupon.code : null,
        },
        config
      );

      dispatch(clearCart());
      navigate(`/order/${data._id}`);
    } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">SHIPPING</h2>
              <p className="text-gray-600">
                <strong className="text-black uppercase text-xs font-['Oswald'] block mb-1">Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.state}
              </p>
              <p className="text-gray-600 mt-2">
                <strong className="text-black uppercase text-xs font-['Oswald'] block mb-1">Phone:</strong>
                {cart.shippingAddress.phone}
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-4">ORDER ITEMS</h2>
              <div className="flex flex-col gap-4">
                {cart.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                      <Link to={`/Products/${item.id}`} className="hover:underline font-['Oswald'] uppercase text-sm">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-sm font-['Oswald']">
                      {item.quantity} x ₦{item.price.toLocaleString()} = ₦{(item.quantity * item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-6 h-fit sticky top-32">
            <h2 className="text-xl font-['Bebas_Neue'] tracking-widest mb-6">ORDER SUMMARY</h2>
            <div className="flex flex-col gap-4 text-sm font-['Oswald'] uppercase tracking-widest">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Items</span>
                <span>₦{itemsPrice.toLocaleString()}</span>
              </div>
              {coupon && (
                <div className="flex justify-between border-b border-gray-800 pb-3 text-green-400">
                  <span>Discount ({coupon.code})</span>
                  <span>- ₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Shipping</span>
                <span>₦{shippingPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span>Tax (5%)</span>
                <span>₦{taxPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2">
                <span>Total</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {error && <div className="bg-red-900/50 text-red-200 p-3 mt-6 text-xs">{error}</div>}

            <Button
              className="w-full py-4 mt-8 text-lg font-['Bebas_Neue'] tracking-widest"
              variant="white"
              disabled={cart.items.length === 0 || loading}
              onClick={placeOrderHandler}
            >
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
