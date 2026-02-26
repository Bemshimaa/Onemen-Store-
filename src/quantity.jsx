import { removeSizeFromCart, increaseQuantity, decreaseQuantity } from "./features/cart/cartslice";
import { useDispatch } from "react-redux";

export default function Quantity({ cartItemId, size, currentQuantity }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeSizeFromCart({ cartItemId, size }));
  };

  const increase = () => {
    dispatch(increaseQuantity({ cartItemId, size }));
  };

  const decrease = () => {
    dispatch(decreaseQuantity({ cartItemId, size }));
  };

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="border p-2 flex flex-row items-center gap-3">
        <i onClick={decrease} className="fa fa-minus cursor-pointer"></i>
        <p>{currentQuantity}</p>
        <i onClick={increase} className="fa fa-plus cursor-pointer"></i>
        <i onClick={handleRemove} className="fa fa-trash cursor-pointer"></i>
      </div>
      <div className="border p-2">
        <i className="far fa-heart"></i>
      </div>
    </div>
  );
}
