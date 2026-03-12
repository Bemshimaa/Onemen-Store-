import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "./button";
import Size from "./size";
import { useState, useEffect } from "react";
import Accordion from "./accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartslice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        data.image = data.image?.startsWith('http') ? data.image : `${import.meta.env.VITE_API_URL}${data.image}`;
        setResult(data);
        setLoading(false);
      } catch (e) {
        console.error('Error fetching product:', e);
        setError(e.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize){
      alert("Please select a size")
      return;
    }
    dispatch(addToCart({
      name: result.name,
      image: result.image,
      id: result._id,
      price: result.price,
      size: selectedSize
    }));

    navigate("/cart")
  };

  if (loading) {
    return <div className="pt-40 text-center font-['Bebas_Neue'] text-3xl tracking-widest uppercase opacity-50">FETCHING PRODUCT...</div>;
  }

  if (error || !result) {
    return (
      <div className="pt-40 text-center flex flex-col gap-4">
        <div className="text-red-500 font-['Oswald'] uppercase tracking-widest text-xl">{error || 'Product Not Found'}</div>
        <Link to="/Products" className="text-black underline font-['Oswald'] uppercase text-sm tracking-widest">Back to Collection</Link>
      </div>
    );
  }

  const Sizes = ["S", "M", "L", "XL"];

  return (
    <section className="pt-30 ">
      <div className="grid sm:grid-cols-2 items-start gap-3 p-3 max-w-[1100px] mx-auto ">
        <div className="border border-gray-200">
        <img
          className="w-full h-full object-cover"
          src={result.image}
          alt={result.name}
        />
      </div>
      <div className="md:pl-7 p-3 flex flex-col flex-start justify-center gap-6">
        <h1 className="text-[3rem] font-['Bebas_Neue'] tracking-tight">{result.name}</h1>
        <p className="text-[1.1rem] text-gray-600 font-['Oswald'] uppercase tracking-wider">{result.description}</p>
        <p className="text-[1.5rem] font-bold">
          ₦{result.price.toLocaleString()}
        </p>
        <div className="flex flex-row flex-wrap gap-3">
          {Sizes.map((size) => (
            <Size
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-200"
              }`}
            >
              {size}
            </Size>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleAddToCart} 
            className="text-center px-10 py-4 font-['Bebas_Neue'] tracking-widest"
            disabled={result.countInStock === 0}
          >
            {result.countInStock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </Button>
          <Button className="text-center px-10 py-4 font-['Bebas_Neue'] tracking-widest" variant="white">FAVORITE</Button>
        </div>

        <div className="mt-4">
          <Accordion title="Size & Fit">
            <ul className="list-disc pl-5 font-['Oswald'] text-sm tracking-wide text-gray-600">
              <li>Female model is wearing size S and is 5'7"/170cm</li>
              <li>Male model is wearing size M and is 5'10"/178cm</li>
              <li>Oversized fit: exaggerated and spacious</li>
            </ul>
          </Accordion>

          <Accordion title="Shipping & Returns">
            <p className="font-['Oswald'] text-sm tracking-wide text-gray-600">
              Free shipping on orders over ₦100,000. Returns accepted within 14
              days of delivery. Item must be unworn and in original packaging.
            </p>
          </Accordion>
        </div>
      </div>
      </div>
    </section>
  );
}
