import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, MessageCircleX, MessageSquareLock, CircleAlert, MessageCircleReply, LogOut, LogOutIcon, LogInIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbardb = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        // { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/browse", label: "Browse Jobs" },
        { href: "/post-job", label: "Post a Job" },
        { href: "/get-history", label: "History" },
    ];

    const navigave = useNavigate()
    const LogoutBtn = () => {
        sessionStorage.removeItem("laundryToken");
        sessionStorage.removeItem("laundryUser");
        navigave("/login")
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
        {/* Blur overlay for mobile menu */}
        {isOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 md:hidden"
    onClick={() => setIsOpen(false)}
    aria-label="Close mobile menu overlay"
  />
)}

<nav className="fixed top-0 left-0 right-0 z-50 bg-card/100 backdrop-blur-lg border-b border-border">
  <div className="container mx-auto px-4">
    
    {/* TOP NAVBAR */}
    <div className="flex items-center justify-between h-16">
      
      {/* LOGO */}
      <Link to="/dashboard" className="flex items-center gap-2 group">
        <div className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>

          <span className="text-xl font-bold text-foreground">
            Clinq<span className="text-gradient">Hub</span>
          </span>
        </div>
      </Link>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive(link.href)
                ? "bg-primary-light text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* DESKTOP LOGOUT */}
      <div
        className="hidden md:flex items-center gap-1 cursor-pointer"
        onClick={LogoutBtn}
      >
        <p>logout</p>
        <LogOut />
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>
    </div>
  </div>

  {/* MOBILE NAVIGATION */}
  <div
    className={cn(
      `
      md:hidden
      overflow-hidden
      bg-card
      border-t border-border
      transition-all duration-500 ease-in-out
      `,
      isOpen
        ? "max-h-[500px] opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-5"
    )}
  >
    <div className="px-4 py-4 flex flex-col gap-2">
      
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={() => setIsOpen(false)}
          className={cn(
            "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
            isActive(link.href)
              ? "bg-primary-light text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {link.label}
        </Link>
      ))}

      {/* MOBILE LOGOUT */}
      <div
        className="mt-4 pt-4 border-t border-border"
        onClick={LogoutBtn}
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
        >
          <span>logout</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>  
    </div>
  </div>
</nav>
        </>
    );
};

export default Navbardb;
