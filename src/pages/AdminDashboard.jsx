import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
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

} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Adminuserdisplay from "./Adminuserdisplay";
import Adminjobdisplay from "./Adminjobdisplay";
import Adminanalytics from "./Adminanalytics";
import Adminreport from "./Adminreport";
import Adminoverview from "./Adminoverview";







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

 



  const LogoutBtn = ()=>{
    navigate("/adminauth")
  sessionStorage.removeItem("admin")
  sessionStorage.removeItem("adminToken")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {mounted && (
        <aside className={`${
          sidebarOpen 
            ? 'w-full md:w-64 absolute md:relative z-40 h-screen md:h-auto' 
            : 'hidden md:flex md:w-20'
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Admin Panel</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "users", label: "Users", icon: Users },
            { id: "jobs", label: "Jobs", icon: Briefcase },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "reports", label: "Reports", icon: AlertTriangle },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Settings</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full ${sidebarOpen ? 'justify-start' : 'justify-center'} text-red-400 hover:text-red-300 hover:bg-red-500/10`}
            // onClick={() => navigate('/adminauth')}
            onClick={LogoutBtn}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
          
    
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Header */}
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
            <Adminoverview/>
          )}

          {activeTab === "users" && (
           <Adminuserdisplay/>
          )}

          {activeTab === "jobs" && (
            <Adminjobdisplay/>
          )}

          {activeTab === "analytics" && (
            <Adminanalytics/>
          )}

          {activeTab === "reports" && (
            <Adminreport/>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
