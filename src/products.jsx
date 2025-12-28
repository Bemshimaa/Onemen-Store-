import Card from "./Productcard";
import { productList } from "../src/data/products";




export default function Products (){
    

    return(
        <section>
            <div className="bg-black h-[250px] relative text-white">
                <h1 className="absolute leading-none text-[4rem] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">ONEMEN PRODUCTS LINEUP</h1>
            </div>
           <div className="grid grid-cols-4">
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
            
        </section>
    );
}