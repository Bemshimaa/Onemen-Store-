import Accordion from "./accordion";
import Button from "./button";
import Quantity from "./quantity";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "./features/cart/cartslice";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const { items: cartProducts, status } = useSelector((state) => state.cart);

  // Fetch cart from backend on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  // Calculate total across all items and their sizes
  const total = cartProducts.reduce((sum, item) => {
    const priceString = item.price.toString().replace(/[^0-9]/g, '');
    const price = parseInt(priceString) || 0;
    const itemTotal = item.sizes.reduce((sizeSum, s) => sizeSum + s.quantity, 0);
    return sum + price * itemTotal;
  }, 0);

  const formattedTotal = total.toLocaleString();

  // Total item count for display
  const totalItems = cartProducts.reduce((count, item) => {
    return count + item.sizes.reduce((sizeCount, s) => sizeCount + s.quantity, 0);
  }, 0);

  if (status === 'loading') {
    return <div className="pt-20 text-center">Loading cart...</div>;
  }

  if (!cartProducts || cartProducts.length === 0) {
    return <div className="pt-20 text-center">Your Cart is Empty</div>;
  }

  return (
    <section className="pt-20">
      <div className="grid md:grid-cols-2 max-w-[1100px] mx-auto p-3">
        <div className="border border-black-500 p-4 ">
          <h1 className="text-[1.6rem]">Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
          <div className="flex flex-col gap-4">
            {
              cartProducts.map((item) => (
                <div className="border-t border-black-500 pt-2" key={item._id}>
                  <div className="flex flex-row gap-4">
                    <img className="w-42 h-42" src={item.image} alt={item.name} />
                    <div className="flex-1">
                      <p className="text-[1.1rem] font-semibold">{item.name}</p>
                      <p>{item.price}</p>

                      {/* Render each size with its own quantity controls */}
                      <div className="mt-2 flex flex-col gap-2">
                        {item.sizes.map((sizeEntry) => (
                          <div key={sizeEntry.size} className="flex flex-col gap-1">
                            <p className="text-[0.9rem]">Size: {sizeEntry.size}</p>
                            <Quantity
                              cartItemId={item._id}
                              size={sizeEntry.size}
                              currentQuantity={sizeEntry.quantity}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
        <div className="bg-black text-white p-4 flex flex-col items-start gap-2 text-[1.2rem] border border-white-500 ">
          <h1 className="text-[1.6rem]">Summary</h1>
          <Accordion title="Do you have a promo code?">
            <form action="" className="flex flex-row items-center gap-3 py-2">
              <label htmlFor="promocode">Promo code:</label>
              <input className="border" type="text" id="promocode" />
              <Button className="py-2 px-4">Apply</Button>
            </form>
          </Accordion>
          <p className="w-1/2 border-b border-gray-500 pb-3">
            Subtotal: <span className="ml-2">N{formattedTotal}</span>
          </p>
          <p className="w-1/2 border-b border-gray-500 pb-3">
            Total: <span className="ml-2">N{formattedTotal}</span>
          </p>
          <Button className="py-2 px-4" variant="white">
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
}
