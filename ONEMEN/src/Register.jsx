import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./features/auth/authSlice";
import Button from "./button";
import Container from "./container";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

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
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <section className="pt-32 pb-20">
      <Container>
        <div className="max-w-[500px] mx-auto bg-white p-8 border border-gray-200 shadow-sm">
          <h1 className="text-[2.5rem] font-['Bebas_Neue'] mb-6 text-center tracking-tight">REGISTER</h1>
          
          {message && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border-l-4 border-red-500">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm border-l-4 border-red-500">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <label htmlFor="password" class="password-label" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" class="confirmPassword-label" className="text-sm font-['Oswald'] uppercase tracking-wider text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="py-4 text-lg font-['Bebas_Neue'] tracking-widest"
              disabled={loading}
            >
              {loading ? "REGISTERING..." : "CREATE ACCOUNT"}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              Have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-black font-bold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
