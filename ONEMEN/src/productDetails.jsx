import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "./button";
import Size from "./size";
import { useState, useEffect } from "react";
import Accordion from "./accordion";
import { useDispatch } from "react-redux";
import { addToCart } from "./features/cart/cartslice";
import img1 from "./assets/IMAGES/Single product page 1.jpeg";
import img2 from "./assets/IMAGES/single product page 2.jpeg";
import img3 from "./assets/IMAGES/single product page 3.jpeg";

export default function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [mainImage, setMainImage] = useState(null);
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
        setMainImage(data.image);
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
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    dispatch(
      addToCart({
        name: result.name,
        image: result.image,
        id: result._id,
        price: result.price,
        size: selectedSize,
        qty: qty,
      })
    );
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    handleAddToCart();
    navigate("/placeorder");
  };

  if (loading) {
    return <div className="pt-40 text-center font-['Bebas_Neue'] text-3xl tracking-widest uppercase opacity-50">FETCHING PRODUCT...</div>;
  }

  if (error || !result) {
    return (
      <div className="pt-40 text-center flex flex-col gap-4">
        <div className="text-red-500 font-['Oswald'] uppercase tracking-widest text-xl">{error || 'Product Not Found'}</div>
        <Link to="/Products/69b2e9f4e9ed06091e034f63" className="text-black underline font-['Oswald'] uppercase text-sm tracking-widest">Back to Collection</Link>
      </div>
    );
  }

  const Sizes = ["S", "M", "L", "XL"];
  const galleryImages = [result.image, img1, img2, img3];

  return (
    <section className="pt-30 ">
      <div className="grid sm:grid-cols-2 items-start gap-3 p-3 max-w-[1100px] mx-auto ">
        <div className="flex flex-col gap-2">
          <div className="border-2 border-black aspect-[4/5] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-all duration-300 contrast-[1.05] brightness-[1.02]"
              src={mainImage}
              alt={result.name}
            />
          </div>
          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {galleryImages.map((img, index) => (
              <div 
                key={index}
                onClick={() => setMainImage(img)}
                className={`border-2 cursor-pointer aspect-square ${mainImage === img ? 'border-black' : 'border-gray-200'}`}
              >
                <img src={img} alt={`view-${index}`} className="w-full h-full object-cover contrast-[1.05]" />
              </div>
            ))}
          </div>
        </div>
      <div className="md:pl-7 p-3 flex flex-col flex-start justify-center gap-6">
        <h1 className="text-[3rem] font-['Bebas_Neue'] tracking-tight">{result.name}</h1>
        <p className="text-[1.1rem] text-gray-600 font-['Oswald'] uppercase tracking-wider">
          Rep ONEMEN in a vintage-inspired top. A loose and slim fit keeping it relaxed and casual.
        </p>
        <p className="text-[1.5rem] font-bold">
          ₦{result.price.toLocaleString()}
        </p>
        <div className="flex flex-row flex-wrap gap-3">
          {Sizes.map((size) => (
            <Size
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setShowSizeError(false);
              }}
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
        
        {showSizeError && (
          <p className="text-red-500 text-xs font-['Oswald'] uppercase tracking-widest -mt-4">
            Please select a size
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-['Oswald'] text-xs tracking-widest uppercase text-gray-400">Quantity</label>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              -
            </button>
            <span className="font-bold text-lg w-5 text-center">{qty}</span>
            <button 
              onClick={() => setQty(Math.min(result.countInStock, qty + 1))}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex gap-3">
            <Button 
              onClick={handleBuyNow} 
              className="flex-1 text-center py-4 font-['Bebas_Neue'] tracking-widest"
              disabled={result.countInStock === 0}
            >
              {result.countInStock > 0 ? "BUY NOW" : "OUT OF STOCK"}
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="flex-1 text-center py-4 font-['Bebas_Neue'] tracking-widest border border-black" 
              variant="white"
              disabled={result.countInStock === 0}
            >
              ADD TO CART
            </Button>
          </div>
          <Button className="w-full text-center py-4 font-['Bebas_Neue'] tracking-widest opacity-20 cursor-not-allowed" variant="white" disabled>FAVORITE</Button>
        </div>

        <div className="mt-8">
          <Accordion title="DELIVERY INFORMATION">
            <div className="font-['Oswald'] text-sm tracking-wide text-gray-600">
              <p className="font-bold text-black mb-1">Status: Ready To Ship</p>
              <p>Domestic Orders: 5 - 7 Business Days.</p>
            </div>
          </Accordion>

          <Accordion title="SIZE GUIDE">
            <ul className="list-disc pl-5 font-['Oswald'] text-sm tracking-wide text-gray-600">
              <li>Model A: 5'11 wearing Size Medium</li>
              <li>Model B: 5'9 wearing Size Small</li>
              <li>Model C: 6'1 wearing Size Medium</li>
            </ul>
          </Accordion>
        </div>
      </div>
      </div>
    </section>
  );
}
