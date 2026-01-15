import Button from "./button";
import { Link } from "react-router-dom";

export default function Card({ image, name, price, id }) {
  return (
    <div className="card p-4 border border-black-500">
      <Link to={`/Products/${id}`}><img className="md:mb-4 mb-2 border border-black-500" src={image} alt={name} /></Link>
      <div className="flex flex-row justify-between items-center md:mb-8 mb-3 ">
        <h2 className="text-[2rem] ">{name}</h2>
        <i className="far fa-heart"></i>
      </div>
      <p className="text-[1.2rem]">{price} <span className="ml-4"><Link to={`/Products/${id}`}><Button className="py-2 px-3 " variant ="black">BUY NOW</Button></Link></span>
      </p>
      
    </div>
  );
}
