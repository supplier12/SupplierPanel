
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: "products" | "orders" | "profile";
}

export const DashboardLayout = ({ children, activeSection }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 relative">
        <AppSidebar 
          activeSection={activeSection}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />
        
        {/* Mobile Backdrop */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white shadow-sm border-b p-3 md:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hover:bg-gray-100 flex-shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg md:text-2xl font-bold gradient-text truncate">
                Supplier Dashboard
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm flex-shrink-0"
              size={isMobile ? "sm" : "default"}
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </header>
          
          <div className="flex-1 p-3 md:p-6 overflow-x-hidden">
            <div className="w-full max-w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
