import { useState, useEffect } from 'react'
import heroImage from './assets/IMAGES/new hero 1.jpeg'
import Button from './button'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Hero() {
  const [productId, setProductId] = useState("")

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const product = data.find(p => 
          p.name.toLowerCase().includes("ringer") || 
          p.name.toLowerCase().includes("red & white")
        );
        if (product) setProductId(product._id);
      } catch (error) {
        console.error("Error fetching product ID for Hero section:", error);
      }
    };
    fetchProductId();
  }, []);

  return (
    <section className="hero relative md:h-[100vh] h-[97vh] overflow-hidden group">
      <img src={heroImage} alt="Hero-image" className='h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 group-active:scale-105' />

      <div className='hero-text absolute bottom-[5%] left-1/2 -translate-x-1/2 flex flex-col items-center w-1/2 text-white animate-fade-up'>
        <h1 className='text-5xl md:text-8xl leading-none text-center sm:text-white'>STREET STYLE UNLEASHED</h1>

        <Link to={`/Products/${productId || "69b2e9f4e9ed06091e034f63"}`}>
          <Button className="py-3 px-4 border border-white-500 hover-expand active:scale-95 transition-transform" variant="black">SHOP NOW</Button>
        </Link>
      </div>

      {/* Subtle blend to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent opacity-40 pointer-events-none"></div>
    </section>
  );
}