import Button from "./button";
import { Link } from "react-router-dom";

export default function Card({ image, name, price, id, countInStock }) {
  const isOutOfStock = countInStock === 0;
  
  return (
    <div className={`card p-4 border border-black-500 relative ${isOutOfStock ? 'opacity-70' : ''}`}>
      <Link to={`/Products/${id}`} className="relative block">
        <img className="md:mb-4 mb-2 border border-black-500 w-full" src={image} alt={name} />
        {isOutOfStock && (
          <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 font-['Bebas_Neue'] tracking-widest text-sm">
            SOLD OUT
          </div>
        )}
      </Link>
      <div className="flex flex-row justify-between items-center md:mb-8 mb-3 ">
        <h2 className="text-[2rem] ">{name}</h2>
        <i className="far fa-heart"></i>
      </div>
      <p className="text-[1.2rem]">
        ₦{price.toLocaleString()} 
        <span className="ml-4">
          <Link to={`/Products/${id}`}>
            <Button 
              className="py-2 px-3 " 
              variant="black"
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "SOLD OUT" : "BUY NOW"}
            </Button>
          </Link>
        </span>
      </p>
    </div>
  );
}
