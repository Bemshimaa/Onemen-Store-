import Card from "./Productcard";
import { productList } from "../src/data/products";




export default function Products (){
    

    return(
        <section>
            <div className="lg:h-[40px] sm:h-[15px] md:h-[30px]"></div>
            <div className="bg-white h-[200px] relative text-black">
                <h1 className="absolute leading-none text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">PRODUCTS LINEUP</h1>
            </div>
           <div className="max-w-[1440px] mx-auto lg:px-3 px-4">
            <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
             {
                productList.map((product) => (
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