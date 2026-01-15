import Card from "./Productcard";
import Button from "./button";
import { Link } from "react-router-dom";
import Container from "./container";

// Removed local image imports since we're using backend URLs now

export default function Bestseller() {
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
          <Card
            id="696514f6c245334b11d681ea"  // MongoDB _id for Red & White tee
            image="http://localhost:5000/images/product-card-1.jpg"  // Backend-served image URL
            name="Red & White tee"
            price="N27,000"
          ></Card>
          <Card
            id="696514f6c245334b11d681eb"  // MongoDB _id for Short Sleeve Polo
            image="http://localhost:5000/images/product-card-2.jpg"  // Backend-served image URL
            name="Short Sleeve Polo"
            price="N27,000"
          ></Card>
          <Card
            id="696514f6c245334b11d681ec"  // MongoDB _id for Onemen Jersey
            image="http://localhost:5000/images/product-card-3.jpg"  // Backend-served image URL
            name="Onemen Jersey"
            price="N27,000"
          ></Card>
          <Card
            id="696514f6c245334b11d681ed"  // MongoDB _id for Receipt Tee
            image="http://localhost:5000/images/product-card-4.jpg"  // Backend-served image URL
            name="Receipt Tee"  // Updated to match DB name
            price="N27,000"
          ></Card>
        </div>
        </div>
      
    </section>
  );
}
