import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Container from "./container";
import { logout } from "./features/auth/authSlice";

export default function MyNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.length);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const location = useLocation();
  const isHome = location.pathname === "/";
  const textColor = isHome ? "text-white" : "text-black";

  return (
    <nav className={`navbar py-5 px-5 absolute w-full z-50 ${textColor} animate-slide-down`}>
      <Container className="flex flex-row justify-between items-center">
        <div className="logo">
          <a className="text-[1.5rem] font-bold hover:scale-110 transition-transform inline-block" href="/">
            ONEMEN
          </a>
        </div>
        <div className="main-menu hidden md:flex">
          <ul className="flex flex-row gap-5">
            <li className="hover:opacity-70">
              <Link to="/">HOME</Link>
            </li>
            <li className="opacity-30 cursor-not-allowed">
              <Link to="/" onClick={(e) => e.preventDefault()} className="cursor-not-allowed">ABOUT</Link>
            </li>
            <li className="opacity-30 cursor-not-allowed">
              <Link to="/" onClick={(e) => e.preventDefault()} className="cursor-not-allowed">CONTACT</Link>
            </li>
            {user && user.isAdmin && (
              <li className="relative group">
                <button className="flex items-center gap-1 font-['Oswald'] tracking-widest text-[#d4af37] hover:text-[#b08d26] cursor-pointer">
                  ADMIN <i className="fas fa-caret-down"></i>
                </button>
                <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-xl hidden group-hover:block min-w-[150px]">
                  <Link to="/admin/productlist" className="block p-3 hover:bg-gray-50 text-xs text-black tracking-widest uppercase border-b border-gray-100">
                    Products
                  </Link>
                  <Link to="/admin/orderlist" className="block p-3 hover:bg-gray-50 text-xs text-black tracking-widest uppercase">
                    Orders
                  </Link>
                </div>
              </li>
            )}
            {user ? (
              <li className={`flex flex-row items-center gap-4 text-xs font-['Oswald'] tracking-widest ${textColor}`}>
                <Link to="/myorders" className="hover:opacity-70 uppercase">
                  MY ORDERS
                </Link>
                <span className="opacity-30">|</span>
                <button
                  onClick={logoutHandler}
                  className="hover:opacity-70 cursor-pointer uppercase"
                >
                  LOGOUT ({user.name})
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className={`font-['Oswald'] uppercase text-sm tracking-widest hover:opacity-70 ${textColor}`}>
                  LOGIN
                </Link>
              </li>
            )}
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
          <div className="bg-white flex flex-col md:hidden absolute top-full w-1/2 right-0 border-l border-b border-gray-100 shadow-xl">
            <Link to="/" onClick={() => setIsOpen(false)} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm">
              HOME
            </Link>
            <Link to="/" onClick={(e) => e.preventDefault()} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm opacity-30 cursor-not-allowed">
              ABOUT
            </Link>
            <Link to="/" onClick={(e) => e.preventDefault()} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm opacity-30 cursor-not-allowed">
              CONTACT
            </Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <>
                    <Link to="/admin/productlist" onClick={() => setIsOpen(false)} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm uppercase text-[#d4af37]">
                      Admin Products
                    </Link>
                    <Link to="/admin/orderlist" onClick={() => setIsOpen(false)} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm uppercase text-[#d4af37]">
                      Admin Orders
                    </Link>
                  </>
                )}
                <Link to="/myorders" onClick={() => setIsOpen(false)} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm uppercase text-[#9c27b0]">
                  MY ORDERS
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsOpen(false);
                  }}
                  className="text-left border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm uppercase"
                >
                  LOGOUT ({user.name})
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="border-b border-gray-100 p-4 font-['Oswald'] tracking-widest text-sm">
                LOGIN
              </Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
}
