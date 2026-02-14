import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 to-orange-600 px-4">

      <div className="rounded-xl shadow-2xl w-full max-w-md p-8 bg-orange-500/90 backdrop-blur-sm">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            src="/crackerscraze.png"   // 👈 Put your logo inside public folder
            alt="Logo"
            className="h-20 object-contain
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Supplier Portal
        </h1>

        {/* Subtitle */}
        <p className="text-center text-orange-100 mb-6">
          Sign in to manage your cracker business
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 bg-white"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-white mb-2">
            Password
          </label>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="h-12 pr-10 bg-white"
          />

          <div
            className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Sign In Button */}
        <Button className="w-full h-12 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-100">
          Sign In
        </Button>

      </div>
    </div>
  );
}
