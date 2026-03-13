import Accordion from "./accordion";
import Button from "./button";
import Quantity from "./quantity";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { applyCoupon, removeCoupon, removeFromCart } from "./features/cart/cartslice";


export default function Cart() {
  const { items: cartProducts, coupon, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = () => {
    // If we have shipping details, jump straight to placeorder
    if (shippingAddress && shippingAddress.address && shippingAddress.city) {
      navigate("/placeorder");
    } else {
      navigate("/shipping");
    }
  };

  const subtotal = cartProducts.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const discountAmount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to apply promo codes");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/coupons/validate`, { code: promoCode }, config);
      dispatch(applyCoupon(data));
      setLoading(false);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setPromoCode("");
  };

  const formattedSubtotal = subtotal.toLocaleString();
  const formattedDiscount = discountAmount.toLocaleString();
  const formattedTotal = total.toLocaleString();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <section className="pt-40 pb-20">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[4rem] md:text-[6rem] font-['Bebas_Neue'] tracking-widest leading-none mb-4">
            YOUR CART IS EMPTY
          </h1>
          <p className="font-['Oswald'] uppercase tracking-widest text-gray-500 mb-8 max-w-md">
            Looks like you haven't added anything to your cart yet. Browse our latest collection to find something you'll love.
          </p>
          <Link to="/Products/69b35d845061c9a003b59a49">
            <Button className="px-12 py-4 text-lg font-['Bebas_Neue'] tracking-widest">
              SHOP COLLECTION
            </Button>
          </Link>
        </div>
      </section>
    );
  }
  return (

    <section className="pt-20">
      <div className="grid md:grid-cols-2 max-w-[1100px] mx-auto p-3 gap-8">
        <div className="border border-black-500 p-4 ">
          <h1 className="text-[1.6rem] font-['Bebas_Neue'] tracking-widest mb-4">Cart</h1>
          <div className="flex flex-col gap-4">
            {cartProducts.map((item, index) => (
              <div 
                className="border-t border-black-500 pt-4 animate-fade-up" 
                key={item.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-row gap-4">
                  <img className="w-32 h-32 object-cover border border-gray-100" src={item.image} alt={item.name} />
                  <div className="flex flex-col flex-grow">
                    <p className="font-['Bebas_Neue'] text-xl tracking-tight uppercase">{item.name}</p>
                    <p className="font-['Oswald'] font-bold">₦{item.price.toLocaleString()}</p>
                    <p className="font-['Oswald'] text-sm tracking-widest text-gray-500 mt-1 uppercase">
                      Size: {item.size} <span className="mx-2 opacity-30">|</span> Qty: {item.quantity}
                    </p>
                    
                    {/* Minimalist Action Icons */}
                    <div className="flex flex-row items-center gap-3 mt-4">
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all scale-90 origin-left"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                      <div className="w-10 h-10 border border-black flex items-center justify-center opacity-20 cursor-not-allowed scale-90 origin-left">
                        <i className="far fa-heart text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white p-4 flex flex-col items-start gap-2 text-[1.2rem] border border-white-500 h-fit">
          <h1 className="text-[1.6rem] font-['Bebas_Neue'] tracking-widest">Summary</h1>
          <Accordion title="Do you have a promo code?">
            {coupon ? (
              <div className="flex justify-between items-center py-2 text-sm font-['Oswald']">
                <span className="text-green-400 font-bold uppercase tracking-widest">Applied: {coupon.code}</span>
                <button onClick={handleRemoveCoupon} className="text-white underline text-xs opacity-60 hover:opacity-100">REMOVE</button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2 py-2">
                <div className="flex flex-row items-center gap-3">
                  <input 
                    className="bg-transparent border border-gray-600 p-2 text-sm focus:outline-none focus:border-white transition-colors w-full font-['Oswald']" 
                    type="text" 
                    placeholder="ENTER CODE"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button type="submit" disabled={loading || !promoCode} className="py-2 px-6 text-sm font-['Bebas_Neue']">
                    {loading ? "..." : "APPLY"}
                  </Button>
                </div>
              </form>
            )}
          </Accordion>
          
          <div className="w-full flex flex-col gap-3 font-['Oswald'] uppercase text-sm tracking-widest pt-4">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span>Subtotal</span>
              <span>₦{formattedSubtotal}</span>
            </div>
            {coupon && (
              <div className="flex justify-between border-b border-gray-800 pb-2 text-green-400">
                <span>Discount</span>
                <span>₦{formattedDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold pt-2">
              <span>Total</span>
              <span>₦{formattedTotal}</span>
            </div>
          </div>
          <Button 
            onClick={handleCheckout}
            className="w-full py-4 text-sm font-['Bebas_Neue'] tracking-widest uppercase active:scale-95 transition-transform" 
            variant="white"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </section>
  );
}
