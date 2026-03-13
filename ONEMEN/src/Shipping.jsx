import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "./features/cart/cartslice";
import Button from "./button";
import Container from "./container";
import { NIGERIAN_STATES } from "./utils/shippingRates";

export default function Shipping() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, setRegion] = useState(shippingAddress.state || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, phone }));
    navigate("/placeorder");
  };

  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="max-w-[600px] mx-auto bg-white p-8 border border-gray-200">
          <h1 className="text-[2.5rem] font-['Bebas_Neue'] mb-8 text-center tracking-tight">SHIPPING</h1>
          
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors character-counter"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="state" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                State / Region
              </label>
              <select
                id="state"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors bg-white font-['Oswald']"
                value={state}
                onChange={(e) => setRegion(e.target.value)}
                required
              >
                <option value="">Select State</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="py-4 text-lg font-['Bebas_Neue'] tracking-widest mt-4"
            >
              CONTINUE TO REVIEW
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
