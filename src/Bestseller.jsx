import Card from "./Productcard";
import Button from './button';
import { Link } from 'react-router-dom'

import ProductImg1 from "./assets/IMAGES/product-card-1.jpg";
import ProductImg2 from "./assets/IMAGES/product-card-2.jpg";
import ProductImg3 from "./assets/IMAGES/Product-card-3.jpg";
import ProductImg4 from "./assets/IMAGES/Product-card-4.jpg";

export default function Bestseller() {
  return (
    <section className="bestseller">
      <div className="flex flex-row justify-between items-center p-4 bg-black">
        <h1 className="md:text-[3rem] text-[2rem] text-center text-white">BESTSELLERS</h1>
        <Link to = "/Products"><Button className="py-1 px-2 md:py-3 md:px-4" variant="white">SEE ALL</Button></Link>
      </div>
      <div className="Productcard grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <Card id={1} image={ProductImg1} name="Red & White tee" price="N27,000"></Card>
        <Card
          id={2}
          image={ProductImg2}
          name="Short Sleeve Polo"
          price="N27,000"
        ></Card>
        <Card
        id={3}
          image={ProductImg3}
          name="Onemen Jersey"
          price="N27,000"
        ></Card>
        <Card
        id={4}
          image={ProductImg4}
          name="Onemen Receipt Tee"
          price="N27,000"
        ></Card>
      </div>
    </section>
  );
}
