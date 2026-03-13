import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/authSlice";
import Button from "./button";
import Container from "./container";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, error } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="max-w-[500px] mx-auto bg-white p-8 border border-gray-200 shadow-sm">
          <h1 className="text-[2.5rem] font-['Bebas_Neue'] mb-6 text-center tracking-tight">LOGIN</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" title="password" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors w-full"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="py-4 text-lg font-['Bebas_Neue'] tracking-widest"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "SIGN IN"}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-black font-bold hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
