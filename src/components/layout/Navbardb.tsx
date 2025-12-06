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
    ];

    const navigave = useNavigate()
    const LogoutBtn = () => {
        localStorage.removeItem("laundryToken");
        localStorage.removeItem("laundryUser");
        navigave("/login")
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <div className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
                                <Sparkles className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold text-foreground">
                                Laundry<span className="text-gradient">Hub</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* <Link to="/login"> */}
                        <div className="hidden md:flex items-center gap-1" onClick={LogoutBtn}>
                            <p >
                                logout
                            </p>
                            <LogInIcon />

                        </div>
                    {/* </Link> */}

                    {/* Mobile Menu Button */}
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

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-slide-up">
                        <div className="flex flex-col gap-2">
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
                            <div className="flex gap-2 mt-4 pt-4 border-t border-border" onClick={LogoutBtn}>
                                {/* <Link to="/login"> */}
                                    <Button variant="ghost" size="sm">
                                        logout
                                    </Button>
                                {/* </Link> */}
                                <MessageCircleReply />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbardb;
