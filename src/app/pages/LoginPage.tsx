import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../Redux/Services/authApi";
import { setCredentials } from "../Redux/features/authSlice";
// @ts-ignore
import loginImage from "../../assets/reem-emad.jpg copy 1.svg";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      if (response.status === "success" && response.data) {
        dispatch(
          setCredentials({
            token: response.data.token,
            admin: response.data.admin,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#faf5f5]">
      {/* Left side form */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-[#f4cde4]">
          <h1 className="text-3xl font-bold mb-6 text-[#141414]" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            Roma Luxury Jewelry Admin
          </h1>
          <p className="text-[#464646] mb-8 font-['Manrope:SemiBold',sans-serif]">
            Please sign in to access your dashboard.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#464646] mb-2 font-['Manrope:SemiBold',sans-serif]">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#f4cde4] focus:outline-none focus:ring-2 focus:ring-[#d52685] transition-all bg-[#fffafd]"
                placeholder="admin@byroma.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#464646] mb-2 font-['Manrope:SemiBold',sans-serif]">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#f4cde4] focus:outline-none focus:ring-2 focus:ring-[#d52685] transition-all bg-[#fffafd]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                Invalid email or password.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-[#d52685] to-[#8e264f] text-white py-3 rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Right side image */}
      <div className="flex-1 hidden lg:flex items-center justify-center p-6 bg-transparent">
        <img
          src={loginImage}
          alt="Roma Login graphic"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
