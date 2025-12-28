import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MyNav() {

  const cartCount = useSelector((state) => state.cart.items.length)
  return (
    <nav
      className="navbar py-5 absolute w-full z-50"
    >
      <Container className="flex flex-row justify-between items-center">
        <div className="logo">
          <a className="text-[1.5rem]" href="">
            ONEMEN
          </a>
        </div>
        <div className="main-menu">
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

        <Link to = "/cart"><div className="cart-icon">
          <a href="">
            <i className="fas fa-shopping-cart"></i> <span>{cartCount}</span>
          </a>
        </div></Link>
      </Container>
    </nav>
  );
}

function Container({ children, className }) {
  return (
    <div
      className={`max-w-[1100px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
