import { useNavigate, useLocation } from "react-router-dom";
import { Package, ShoppingCart, User, Package2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  activeSection: "products" | "orders" | "profile";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const AppSidebar = ({ activeSection, isOpen, setIsOpen, isMobile }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Reordered menu items as per requirement
  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your information",
      path: "/profile"
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      description: "Manage your products",
      path: "/products"
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingCart,
      description: "View and manage orders",
      path: "/orders"
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  if (isMobile) {
    return (
      <div 
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 py-1">
              <img 
                src="/lovable-uploads/00d439d3-3f7b-4731-b5c6-f647e9b5a006.png" 
                alt="Crackers Craze Logo" 
                className="h-10 w-10 object-contain flex-shrink-0"
              />
              <span className="text-lg font-bold text-sidebar-foreground">Supplier Panel</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-sidebar-accent text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      <div className={cn(
                        "text-xs truncate",
                        isActive 
                          ? "text-sidebar-primary-foreground/80" 
                          : "text-sidebar-foreground/60"
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div 
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex-shrink-0",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <img 
            src="/lovable-uploads/00d439d3-3f7b-4731-b5c6-f647e9b5a006.png" 
            alt="Crackers Craze Logo" 
            className="h-10 w-10 object-contain flex-shrink-0"
          />
          <span className="text-lg font-bold text-sidebar-foreground">Supplier Panel</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{item.label}</div>
                    <div className={cn(
                      "text-xs truncate",
                      isActive 
                        ? "text-sidebar-primary-foreground/80" 
                        : "text-sidebar-foreground/60"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
