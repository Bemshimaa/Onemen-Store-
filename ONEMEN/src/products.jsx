import React, {useState, useEffect} from "react";
import Card from "./Productcard";






export default function Products (){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching products', error);
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return(
        <section>
            <div className="lg:h-[40px] sm:h-[15px] md:h-[30px]"></div>
            <div className="bg-white h-[200px] relative text-black">
                <h1 className="absolute leading-none text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">PRODUCTS LINEUP</h1>
            </div>
            <div className="max-w-[1440px] mx-auto lg:px-3 px-4">
                {loading ? (
                    <div className="text-center py-20 font-['Bebas_Neue'] text-3xl tracking-widest uppercase opacity-50">
                        Loading Collection...
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500 font-['Oswald'] uppercase tracking-widest">
                        {error}
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
                        {products.map((product) => (
                            <Card 
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image?.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}${product.image}`}
                                description={product.description}
                                countInStock={product.countInStock}
                            />
                        ))}
                    </div>
                )}
            </div>
            
        </section>
    );
}