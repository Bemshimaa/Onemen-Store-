import React, {useState, useEffect} from "react";
import Card from "./Productcard";





export default function Products (){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
            const response = await fetch('hhtp://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
            } catch (error){
                console.log('Error fetching products', error);
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
            <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
             {
                products.map((product) => (
                <Card 
                key={product.id}
                id= {product.id}
                name = {product.name}
                price = {product.price}
                image = {product.image}
                description = {product.description}>
                </Card>
            ))}
           </div>
           </div>
            
        </section>
    );
}