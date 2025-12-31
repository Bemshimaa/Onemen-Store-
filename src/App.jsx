import { Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./hero";
import MyNav from "./navbar";
import Bestseller from "./Bestseller";
import Culture from "./culture";
import New from "./new";
import Footer from "./footer";
import Products from "./products";
import ProductPage from "./productDetails";
import Cart from "./cart";

export default function Myapp() {
  return (
    <div className="flex flex-col min-h-screen">
      <MyNav></MyNav>

      <main className="flex-grow">
        <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Bestseller />
              <Culture />
              <New />
            </>
          }
        ></Route>

        <Route path="/Products" element={<Products/>}></Route>
        <Route path="Products/:productId" element={<ProductPage/>}></Route>

        
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
      </main>

      <Footer></Footer>
    </div>
  );
}
