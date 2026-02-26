import Card from "./Productcard";
import Button from "./button";
import { Link } from "react-router-dom";
import Container from "./container";
import { useState, useEffect } from "react";

const CACHE_KEY = "onemen_products";
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export default function Bestseller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      // Try localStorage first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setProducts(data.slice(0, 4));
            return;
          }
        } catch {
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // Fetch from backend
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.slice(0, 4));
        // Cache in localStorage
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (error) {
        console.log("Error fetching bestsellers", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <section className="bestseller bg-[#f8f8f8] md:min-h-[90vh] min-h-[100vh] relative flex items-center justify-center">

      <div className="p-4 bg-black w-full absolute top-0 left-0 right-0">
        <div className="flex flex-row justify-between items-center max-w-[1440px] mx-auto">
          <h1 className="md:text-[3rem] text-[2rem] text-center text-white">
            BESTSELLERS
          </h1>
          <Link to="/Products">
            <Button className="py-1 px-2 md:py-3 md:px-4" variant="white">
              SEE ALL
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-4 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="Productcard grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            ></Card>
          ))}
        </div>
      </div>

    </section>
  );
}
