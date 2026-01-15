import { useParams } from "react-router-dom";
// Removed import of static productList since we're fetching from API
import Button from "./button";
import Size from "./size";
import { useState, useEffect } from "react"; // Added useEffect for fetching
import Accordion from "./accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartslice";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productId } = useParams(); // productId is now MongoDB _id string
  const [selectedSize, setSelectedSize] = useState(null);
  const [result, setResult] = useState(null); // State to hold fetched product

  // Fetch single product from API using productId (_id)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        // Ensure image is absolute URL
        data.image = data.image?.startsWith('http') ? data.image : `http://localhost:5000${data.image}`;
        setResult(data);
      } catch (e) {
        console.error('Error fetching product:', e);
        setResult(null);
      }
    };
    fetchProduct();
  }, [productId]);

  // Removed static find logic, now using fetched result

  const handleAddToCart = () => {
    if (!selectedSize){
      alert("Please select a size")
      return;
    }
    dispatch(addToCart({
      name: result.name,
      image: result.image,
      id: result._id, // Changed from result.id to result._id (MongoDB ObjectId)
      price: result.price,
      size: selectedSize
    }));

    navigate("/cart")
  };
  if (!result) {
    return <div>Loading... or Product Not Found</div>; // Updated message for loading state
  }

  const Sizes = ["S", "M", "L", "XL"];

  return (
    <section className="pt-30 ">
      <div className="grid sm:grid-cols-2 items-start gap-3 p-3 max-w-[1100px] mx-auto ">
        <div className="border border-black-500">
        <img
          className="w-full h-full object-cover"
          src={result.image}
          alt={result.name}
        />
      </div>
      <div className="md:pl-7 p-3 flex flex-col flex-start justify-center gap-6 border border-black-500">
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
      </div>
    </section>
  );
}
