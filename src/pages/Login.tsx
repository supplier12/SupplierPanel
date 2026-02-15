
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Package } from "lucide-react";
import axios from 'axios';
import { toast } from 'sonner'; 
import { useSupplierContext } from "@/context/appContext";

const Login = () => {
  const navigate = useNavigate();
  const {setSupplierToken} = useSupplierContext();

  useEffect(() => {
    const token = localStorage.getItem('SupplierToken');
    if(token) {
      setSupplierToken(token);
    }
  }, [setSupplierToken]);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const verifyLogin = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, 
        {
          email: formData.email,
          password: formData.password 
        }
      );
      if (verifyLogin.data){
        setIsLoading(false);
        toast.success("Login Successful",
          {
            position: 'top-right',
            duration: 1500,
          }
        );
        localStorage.setItem('SupplierToken', verifyLogin.data.token);
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs
        localStorage.setItem("expiresAt", expiresAt.toString());
        setSupplierToken(verifyLogin.data.token);
        navigate("/products");
      }
    }
    catch(error){
      const errorMessage = error.response.data.message;
      setIsLoading(false);
      toast.error("Login Failed",
        {
          position: 'top-right',
          duration: 1500,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 gradient-bg">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/lovable-uploads/00d439d3-3f7b-4731-b5c6-f647e9b5a006.png" 
              alt="Crackers Craze Logo" 
              className="h-20 w-20 object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">
            Supplier Portal
          </CardTitle>
          <CardDescription className="text-lg">
            Sign in to manage your cracker business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="supplier@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium gradient-bg border-0 hover:opacity-90 transition-opacity"
              disabled = {isLoading}
            >
              {isLoading ? "Processing..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
