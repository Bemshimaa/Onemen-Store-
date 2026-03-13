import { useState, useEffect } from "react";
import NewImage from "./assets/IMAGES/new in image.jpeg";
import Button from "./button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function New() {
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        // Find product that contains "ringer" or "red & white" (to support both names)
        const product = data.find(p => 
          p.name.toLowerCase().includes("ringer") || 
          p.name.toLowerCase().includes("red & white")
        );
        if (product) {
          setProductId(product._id);
        }
      } catch (error) {
        console.error("Error fetching product ID for New In section:", error);
      }
    };
    fetchProductId();
  }, []);

  return (
    <section className="w-full h-[350px] lg:h-[400px] relative overflow-hidden group">
      {/* Top blend */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent opacity-50 z-10 pointer-events-none"></div>

      <img
        className="w-full h-full object-cover object-[center_40%] transition-transform duration-1000 group-hover:scale-105 group-active:scale-105"
        src={NewImage}
        alt="new collection"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white text-center animate-fade-up">
        <h1 className="md:text-[3rem] lg:text-[4rem] text-[2rem] leading-none text-white drop-shadow-lg">NEW IN</h1>
        <p className="text-[0.8rem] lg:text-[1rem] lg:leading-none sm:text-[0.9rem] pb-2 font-['Oswald'] tracking-widest uppercase opacity-90 drop-shadow-md">Shop From our latest release - ONEMEN Ringer Tee</p>
        <Link to={`/Products/${productId || "69b35d845061c9a003b59a49"}`}>
          <Button variant="white" className="py-2 px-8 font-['Bebas_Neue'] tracking-widest hover-expand active:scale-95 transition-transform">SHOP NOW</Button>
        </Link>
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-50 z-10 pointer-events-none"></div>
    </section>
  );
}
