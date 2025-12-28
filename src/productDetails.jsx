import { useParams } from "react-router-dom";
import { productList } from "../src/data/products";
import Button from "./button";
import Size from "./size";
import { useState } from "react";
import Accordion from "./accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartslice";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);

  const result = productList.find(
    (product) => product.id === Number(productId)
  );
  const handleAddToCart = () => {
    if (!selectedSize){
      alert("Please select a size")
      return;
    }
    dispatch(addToCart({
      name: result.name,
      image: result.image,
      id: result.id,
      price: result.price,
      size: selectedSize
    }));

    navigate("/cart")
  };
  if (!result) {
    return <div>Product Not Found</div>;
  }

  const Sizes = ["S", "M", "L", "XL"];

  return (
    <section className="pt-30 grid grid-cols-2 items-start gap-3">
      <div className="">
        <img
          className="w-full h-full object-cover"
          src={result.image}
          alt={result.name}
        />
      </div>
      <div className="pl-7 flex flex-col flex-start justify-center gap-6">
        <h1 className="text-[3rem]">{result.name}</h1>
        <p className="text-[1.2rem]">{result.description}</p>
        <p className="block w-1/2 flex justify-between text-[1.2rem]">
          {result.price}
        </p>
        <div className="flex flex-row flex-wrap gap-3">
          {Sizes.map((size) => (
            <Size
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {size}
            </Size>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleAddToCart} className="text-center">ADD TO CART</Button>
          <Button className="text-center">FAVORITE</Button>
        </div>

        <div>
          <Accordion title="Size & Fit">
            <ul className="list-disc">
              <li>Female model is wearing size S and is 5'7"/170cm</li>
              <li>Male model is wearing size M and is 5'10"/178cm</li>
              <li>Oversized fit: exaggerated and spacious</li>
            </ul>
          </Accordion>

          <Accordion title="Shipping & Returns">
            <p>
              Free shipping on orders over ₦50,000. Returns accepted within 14
              days of delivery. Item must be unworn and in original packaging.
            </p>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
