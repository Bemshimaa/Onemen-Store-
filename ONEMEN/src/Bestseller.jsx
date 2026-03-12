import { useState, useEffect } from "react";
import Card from "./Productcard";
import Button from "./button";
import { Link } from "react-router-dom";
import Container from "./container";
import axios from "axios";

export default function Bestseller() {
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/bestsellers`);
        setBestsellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
        // The provided snippet had server-side code here, which is not valid in a React component.
        // It also had a syntax error (cconst instead of const).
        // Assuming the intent was to ensure setLoading(false) is called on error.
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  return (
    <section className="bestseller">
      <div className="p-4 bg-black w-full">
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
      <div className="max-w-[1440px] mx-auto px-2 md:px-3">
        <div className="Productcard grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {loading ? (
            <p className="text-white p-4">Loading bestsellers...</p>
          ) : bestsellers.length > 0 ? (
            bestsellers.map((product) => (
              <Card
                key={product._id}
                id={product._id}
                image={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}${product.image}`}
                name={product.name}
                price={product.price}
                countInStock={product.countInStock}
              />
            ))
          ) : (
            <p className="text-white p-4">No bestsellers found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
