

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add validation here later
    navigate("/profile");
  };

  return (
    // 🔥 Full Orange Background
    <div className="min-h-screen flex items-center justify-center bg-orange-600 px-4">

      {/* ✅ White Center Card */}
      <div className="rounded-xl shadow-2xl w-full max-w-md p-8 bg-white">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Supplier Portal
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-6">
          Sign in to manage your cracker business
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="h-12 pr-10"
          />

          <div
            className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Sign In Button */}
        <Button
          onClick={handleLogin}
          className="w-full h-12 text-lg font-semibold bg-orange-600 text-white hover:bg-orange-700"
        >
          Sign In
        </Button>

      </div>
    </div>
  );
}
