import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function MyNav() {
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = useSelector((state) => state.cart.items.length);
  return (
    <nav className="navbar py-5 px-3 absolute w-full z-50">
      <Container className="flex flex-row justify-between items-center">
        <div className="logo">
          <a className="text-[1.5rem]" href="">
            ONEMEN
          </a>
        </div>
        <div className="main-menu hidden md:flex">
          <ul className="flex flex-row gap-5">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <a className="" href="">
                About Us
              </a>
            </li>
            <li>
              <Link to="/Products">SHOP</Link>
            </li>
            <li>
              <a className="" href="">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* mobile controls (cart + hamburger) */}
        <div className="flex flex-row gap-3 items-center">
          <Link to="/cart">
            
              <button>
                <i className="fas fa-shopping-cart"></i>{" "}
                <span>{cartCount}</span>
              </button>
            
          </Link>
          <button className="md:hidden flex" onClick={() => setIsOpen(!isOpen)}>
            <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>

        {isOpen && (
          <div className="bg-white flex flex-col md:hidden absolute top-full w-1/2 right-0">
            <Link to="/" onClick={() => setIsOpen(false)} className="border-b border-black-500">
              HOME
            </Link>
            <Link to="" onClick={() => setIsOpen(false)} className="border-b border-black-500">
              ABOUT US
            </Link>
            <Link to="/Products" onClick={() => setIsOpen(false)} className="border-b border-black-500">
              SHOP
            </Link>
            <Link to="" onClick={() => setIsOpen(false)} className="border-b border-black-500">
              CONTACT US
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}

function Container({ children, className }) {
  return (
    <div className={`max-w-[1100px] mx-auto ${className}`}>{children}</div>
  );
}
