import Accordion from "./accordion";
import Button from "./button";
import Quantity from "./quantity";
import { useSelector } from "react-redux";


export default function Cart() {
  const cartProducts = useSelector((state) => state.cart.items);

  const total = cartProducts.reduce((sum, item) => {
    const priceString = item.price.toString().replace(/[^0-9]/g, '');
     const price = parseInt(priceString);
     return sum + price;

  }, 0);

  const formattedTotal = total.toLocaleString();

  if (!cartProducts || cartProducts.length === 0) {
    return <div>Your Cart is Empty</div>;
  }
  return (

    <section className="grid grid-cols-2 pt-20">
      <div className="border border-500-green p-4 ">
        <h1 className="text-[1.6rem]">Cart</h1>
        <div className="flex flex-col gap-4">
          {
            cartProducts.map((item) => (
              <div key={item.id}>
                <div className="flex flex-row gap-4">
                  <img className="w-42 h-42" src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </div>
                <Quantity id= {item.id}
                currentQuantity = {item.quantity}></Quantity>
              </div>
            ))
          }
        </div>
        
      </div>
      <div className="bg-black text-white border border-blue-500 p-4 flex flex-col items-start gap-2 text-[1.2rem]">
        <h1 className="text-[1.6rem]">Summary</h1>
        <Accordion title="Do you have a promo code?">
          <form action="" className="flex flex-row items-center gap-3 py-2">
            <label htmlFor="promocode">Promo code:</label>
            <input className="border" type="text" id="promocode" />
            <Button className="py-2 px-4">Apply</Button>
          </form>
        </Accordion>
        <p className="w-1/2 border-b border-gray-500 pb-3">
          Subtotal: <span className="ml-2">{formattedTotal}</span>
        </p>
        <p className="w-1/2 border-b border-gray-500 pb-3">
          Total: <span className="ml-2">{formattedTotal}</span>
        </p>
        <Button className="py-2 px-4" variant="white">
          Checkout
        </Button>
      </div>
    </section>
  );
}
