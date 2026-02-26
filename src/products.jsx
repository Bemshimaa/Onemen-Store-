import React, { useState, useEffect } from "react";
import Card from "./Productcard";

const CACHE_KEY = "onemen_products";
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            // Try localStorage first
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                try {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setProducts(data);
                        setLoading(false);
                        return;
                    }
                } catch {
                    localStorage.removeItem(CACHE_KEY);
                }
            }

            // Fetch from backend
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
                // Cache in localStorage
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data,
                    timestamp: Date.now(),
                }));
            } catch (error) {
                console.log('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <section>
                <div className="lg:h-[40px] sm:h-[15px] md:h-[30px]"></div>
                <div className="bg-white h-[200px] relative text-black">
                    <h1 className="absolute leading-none text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">PRODUCTS LINEUP</h1>
                </div>
                <div className="text-center py-10 text-[1.2rem]">Loading products...</div>
            </section>
        );
    }

    return (
        <section>
            <div className="lg:h-[40px] sm:h-[15px] md:h-[30px] mt-8"></div>
            <div className="bg-white h-[200px] relative text-black">
                <h1 className="absolute leading-none text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">PRODUCTS LINEUP</h1>
            </div>
            <div className="max-w-[1440px] mx-auto lg:px-3 px-4 my-8">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {
                        products.map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                description={product.description}>
                            </Card>
                        ))}
                </div>
            </div>

        </section>
    );
}