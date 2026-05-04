import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Users,
  Briefcase,
  Search,
  Shield,
  BarChart3,
  AlertTriangle,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  MessagesSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Adminuserdisplay from "./Adminuserdisplay";
import Adminjobdisplay from "./Adminjobdisplay";
import Adminanalytics from "./Adminanalytics";
import Adminreport from "./Adminreport";
import Adminoverview from "./Adminoverview";
import Adminchat from "./Adminchat";

const stats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalJobs: 3456,
  activeJobs: 234,
  totalRevenue: 2450000,
  monthlyGrowth: 12.5,
  bannedUsers: 23,
  reportedPosts: 15
};






const getStatusBadge = (status) => {
  const styles = {
    Active: "bg-green-500/20 text-green-400 border-green-500/30",
    Warned: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Banned: "bg-red-500/20 text-red-400 border-red-500/30",
    "In Progress": "bg-primary/20 text-primary border-primary/30",
    Completed: "bg-green-500/20 text-green-400 border-green-500/30",
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Disputed: "bg-red-500/20 text-red-400 border-red-500/30"
  };
  return styles[status] || "bg-muted text-muted-foreground";
};

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (mounted && isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile, mounted]);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  const LogoutBtn = () => {
    navigate("/adminauth")
    sessionStorage.removeItem("admin")
    sessionStorage.removeItem("adminToken")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {mounted && (
        <>
          {/* 🔥 OVERLAY (MOBILE ONLY) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* 🔥 SIDEBAR */}
          <aside
            className={`
        fixed md:relative top-0 left-0 z-40
        h-screen md:h-auto
        bg-card border-r border-border
        transition-all duration-300 ease-in-out
        
        ${sidebarOpen
                ? "w-72 translate-x-0"
                : "w-0 -translate-x-full md:w-20 md:translate-x-0"}
        
        flex flex-col overflow-hidden shadow-xl md:shadow-none
      `}
          >
            {/* HEADER */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center justify-center md:justify-start p-0">
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow">
                  <Shield className="w-5 h-5 text-white" />
                </div>

                {sidebarOpen && (
                  <span className="ml-3 font-semibold text-lg text-foreground">
                    Admin Panel
                  </span>
                )}
              </div>

              {/* TOGGLE BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* NAV */}
            <nav className="flex-1 p-3 space-y-2">
              {[
                { id: "overview", label: "Overview", icon: Home },
                { id: "users", label: "Users", icon: Users },
                { id: "jobs", label: "Jobs", icon: Briefcase },
                { id: "chats", label: "Chats", icon: MessagesSquare },
                { id: "analytics", label: "Analytics", icon: BarChart3 },
                { id: "reports", label: "Reports", icon: AlertTriangle },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`
              w-full flex items-center gap-3
              ${sidebarOpen ? "justify-start px-3" : "justify-center px-0"}
              transition-all
            `}
                  onClick={() => {
                    handleNavClick(item.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              ))}
            </nav>

            {/* FOOTER */}
            <div className="p-3 border-t border-border space-y-2">
              <Button
                variant="ghost"
                className={`w-full flex items-center gap-3 ${sidebarOpen ? "justify-start" : "justify-center"
                  }`}
              >
                <Settings className="w-5 h-5" />
                {sidebarOpen && <span>Settings</span>}
              </Button>

              <Button
                variant="ghost"
                className={`w-full flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 ${sidebarOpen ? "justify-start" : "justify-center"
                  }`}
                onClick={LogoutBtn}
              >
                <LogOut className="w-5 h-5" />
                {sidebarOpen && <span>Logout</span>}
              </Button>
            </div>
          </aside>
        </>
      )}

      <main className="flex-1 overflow-auto w-full">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {/* {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} */}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {/* Manage your LaundryHub platform */}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-64 bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">
                  {stats.reportedPosts}
                </span>
              </Button>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">AD</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === "overview" && (
            <Adminoverview />
          )}

          {activeTab === "users" && (
            <Adminuserdisplay />
          )}

          {activeTab === "jobs" && (
            <Adminjobdisplay />
          )}

          {activeTab === "analytics" && (
            <Adminanalytics />
          )}

          {activeTab === "reports" && (
            <Adminreport />
          )}

          {activeTab === "chats" && (
            <Adminchat />
          )}
        </div>
      </main>
    </div>
  );
};
export default AdminDashboard;
