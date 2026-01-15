import { removeFromCart, increaseQuantity, decreaseQuantity } from "./features/cart/cartslice";
import { useDispatch } from "react-redux";

export default function Quantity({id, currentQuantity}) {
  const dispatch = useDispatch();

  const handleRemove = () => {dispatch(removeFromCart(id))};

  const increase = () => {dispatch(increaseQuantity(id))};
  const decrease = () => {dispatch(decreaseQuantity(id))};

  return (
    <div className="mt-3 flex flex-row items-center gap-3">
      <div className="border p-2 flex flex-row items-center gap-3">
        <i onClick={decrease} className="fa fa-minus cursor-pointer"></i>
        <p>{currentQuantity}</p>
        <i onClick={increase} className="fa fa-plus cursor-pointer"></i>
        <i onClick={handleRemove} className="fa fa-trash"></i>
      </div>
      <div className="border p-2">
        <i className="far fa-heart"></i>
      </div>
    </div>
  );
}
