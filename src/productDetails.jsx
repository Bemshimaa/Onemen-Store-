import { useParams } from "react-router-dom";
import Button from "./button";
import Size from "./size";
import { useState, useEffect } from "react";
import Accordion from "./accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartslice";
import { useNavigate } from "react-router-dom";

const CACHE_KEY = "onemen_products";
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      // Try localStorage cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            const found = data.find((p) => p.id === Number(productId));
            if (found) {
              setProduct(found);
              setLoading(false);
              return;
            }
          }
        } catch {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // Fetch single product from backend
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.log("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    dispatch(
      addToCart({
        name: product.name,
        image: product.image,
        id: product.id,
        price: product.price,
        size: selectedSize,
      })
    );

    navigate("/cart");
  };

  if (loading) {
    return <div className="pt-30 text-center text-[1.2rem]">Loading...</div>;
  }

  if (!product) {
    return <div className="pt-30 text-center text-[1.2rem]">Product Not Found</div>;
  }

  const Sizes = product.sizes || ["S", "M", "L", "XL"];

  return (
    <section className="pt-30 ">
      <div className="grid sm:grid-cols-2 items-start gap-3 p-3 max-w-[1100px] mx-auto ">
        <div className="border border-black-500">
          <img
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="md:pl-7 p-3 flex flex-col flex-start justify-center gap-6 border border-black-500">
          <h1 className="text-[3rem]">{product.name}</h1>
          <p className="text-[1.2rem]">{product.description}</p>
          <p className="block w-1/2 flex justify-between text-[1.2rem]">
            {product.price}
          </p>
          <div className="flex flex-row flex-wrap gap-3">
            {Sizes.map((size) => (
              <Size
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`${selectedSize === size
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
            <Accordion title="Size &amp; Fit">
              <ul className="list-disc">
                <li>Female model is wearing size S and is 5'7"/170cm</li>
                <li>Male model is wearing size M and is 5'10"/178cm</li>
                <li>Oversized fit: exaggerated and spacious</li>
              </ul>
            </Accordion>

            <Accordion title="Shipping &amp; Returns">
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
