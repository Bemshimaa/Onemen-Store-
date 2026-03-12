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
import Login from "./Login";
import Register from "./Register";
import Shipping from "./Shipping";
import PlaceOrder from "./PlaceOrder";
import OrderScreen from "./OrderScreen";
import MyOrders from "./MyOrders";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ProductListScreen from "./ProductListScreen";
import ProductEditScreen from "./ProductEditScreen";
import OrderListScreen from "./OrderListScreen";

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
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
        </Route>
      </Routes>
      </main>

      <Footer></Footer>
    </div>
  );
}
