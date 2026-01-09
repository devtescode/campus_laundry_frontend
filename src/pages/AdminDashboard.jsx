import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp,
  Search,
  Ban,
  Trash2,
  Eye,
  Shield,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  UserCheck,
  ShoppingBag,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data
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

const users = [
  { id: 1, name: "Chidi Mbachu", email: "chidi@unilag.edu.ng", university: "UNILAG", role: "Both", jobs: 12, rating: 4.8, status: "Active", joined: "Jan 15, 2024" },
  { id: 2, name: "Adaeze Nwosu", email: "adaeze@ui.edu.ng", university: "UI", role: "Washer", jobs: 45, rating: 4.9, status: "Active", joined: "Dec 3, 2023" },
  { id: 3, name: "Tunde Okonkwo", email: "tunde@oau.edu.ng", university: "OAU", role: "Poster", jobs: 8, rating: 4.5, status: "Warned", joined: "Feb 20, 2024" },
  { id: 4, name: "Amara Kalu", email: "amara@futa.edu.ng", university: "FUTA", role: "Both", jobs: 23, rating: 4.7, status: "Active", joined: "Nov 10, 2023" },
  { id: 5, name: "Emeka Obi", email: "emeka@uniben.edu.ng", university: "UNIBEN", role: "Washer", jobs: 67, rating: 4.6, status: "Banned", joined: "Oct 5, 2023" },
  { id: 6, name: "Ngozi Peters", email: "ngozi@unn.edu.ng", university: "UNN", role: "Poster", jobs: 15, rating: 4.4, status: "Active", joined: "Mar 1, 2024" },
];

const jobs = [
  { id: 1, type: "Washing & Ironing", poster: "Chidi M.", washer: "Adaeze N.", price: 3500, status: "In Progress", location: "UNILAG", date: "Dec 2, 2024", reported: false },
  { id: 2, type: "Washing Only", poster: "Amara K.", washer: "Tunde O.", price: 2000, status: "Completed", location: "UI", date: "Dec 1, 2024", reported: false },
  { id: 3, type: "Ironing Only", poster: "Ngozi P.", washer: null, price: 2500, status: "Pending", location: "UNN", date: "Dec 2, 2024", reported: true },
  { id: 4, type: "Washing & Folding", poster: "Emeka O.", washer: "Chidi M.", price: 4000, status: "Disputed", location: "UNIBEN", date: "Nov 30, 2024", reported: true },
  { id: 5, type: "Full Service", poster: "Tunde O.", washer: "Amara K.", price: 6000, status: "Completed", location: "OAU", date: "Nov 29, 2024", reported: false },
];

const recentActivity = [
  { id: 1, action: "New user registered", user: "Blessing A.", time: "2 mins ago", type: "user" },
  { id: 2, action: "Job reported for spam", user: "Anonymous", time: "15 mins ago", type: "report" },
  { id: 3, action: "Payment processed", amount: "₦5,000", time: "30 mins ago", type: "payment" },
  { id: 4, action: "User banned", user: "Fake Account", time: "1 hour ago", type: "ban" },
  { id: 5, action: "New job posted", user: "Chidi M.", time: "2 hours ago", type: "job" },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBanUser = (user) => {
    toast({
      title: "User Banned",
      description: `${user.name} has been banned from the platform.`,
    });
  };

  const handleUnbanUser = (user) => {
    toast({
      title: "User Unbanned",
      description: `${user.name} has been unbanned.`,
    });
  };

  const handleDeleteJob = (job) => {
    toast({
      title: "Job Deleted",
      description: `Job #${job.id} has been removed from the platform.`,
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(job =>
    job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.poster.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const LogoutBtn = ()=>{
    navigate("/adminauth")
  sessionStorage.removeItem("admin")
  sessionStorage.removeItem("adminToken")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Admin Panel</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              onClick={() => setActiveTab(item.id)}
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your LaundryHub platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
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
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                        <p className="text-xs text-green-400">+{stats.monthlyGrowth}% this month</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Jobs</p>
                        <p className="text-2xl font-bold text-foreground">{stats.totalJobs.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{stats.activeJobs} active</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-2xl font-bold text-foreground">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                        <p className="text-xs text-green-400">+8.2% this month</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Reports</p>
                        <p className="text-2xl font-bold text-foreground">{stats.reportedPosts}</p>
                        <p className="text-xs text-yellow-400">Needs attention</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Activity */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Activity Chart Placeholder */}
                <Card className="bg-card border-border lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Platform Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
                        <div key={month} className="flex flex-col items-center gap-2 flex-1">
                          <div 
                            className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                            style={{ height: `${Math.random() * 80 + 20}%` }}
                          />
                          <span className="text-xs text-muted-foreground">{month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'user' ? 'bg-primary/20' :
                          activity.type === 'report' ? 'bg-yellow-500/20' :
                          activity.type === 'payment' ? 'bg-green-500/20' :
                          activity.type === 'ban' ? 'bg-red-500/20' :
                          'bg-accent/20'
                        }`}>
                          {activity.type === 'user' && <UserCheck className="w-4 h-4 text-primary" />}
                          {activity.type === 'report' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                          {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-green-500" />}
                          {activity.type === 'ban' && <Ban className="w-4 h-4 text-red-500" />}
                          {activity.type === 'job' && <ShoppingBag className="w-4 h-4 text-accent" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.user || activity.amount} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Top Universities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "UNILAG", users: 342, percentage: 27 },
                      { name: "UI", users: 289, percentage: 23 },
                      { name: "OAU", users: 198, percentage: 16 },
                      { name: "FUTA", users: 156, percentage: 13 },
                      { name: "UNN", users: 134, percentage: 11 },
                    ].map((uni) => (
                      <div key={uni.name} className="flex items-center gap-4">
                        <span className="text-sm text-foreground w-20">{uni.name}</span>
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${uni.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-16 text-right">{uni.users}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Job Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Washing & Ironing", count: 1456, percentage: 42 },
                      { name: "Washing Only", count: 987, percentage: 29 },
                      { name: "Ironing Only", count: 543, percentage: 16 },
                      { name: "Full Service", count: 321, percentage: 9 },
                      { name: "Dry Cleaning", count: 149, percentage: 4 },
                    ].map((cat) => (
                      <div key={cat.name} className="flex items-center gap-4">
                        <span className="text-sm text-foreground w-32 truncate">{cat.name}</span>
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-16 text-right">{cat.count}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {stats.activeUsers} Active
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {stats.bannedUsers} Banned
                  </Badge>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead>User</TableHead>
                        <TableHead>University</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Jobs</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-border">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-xs font-medium text-primary">{user.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.university}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.jobs}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-yellow-500">
                              ★ {user.rating}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className={user.status === "Banned" ? "text-green-400" : "text-red-400"}
                                  >
                                    {user.status === "Banned" ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      {user.status === "Banned" ? "Unban User" : "Ban User"}
                                    </DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to {user.status === "Banned" ? "unban" : "ban"} {user.name}?
                                      {user.status !== "Banned" && " This will prevent them from accessing the platform."}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button 
                                      variant={user.status === "Banned" ? "default" : "destructive"}
                                      onClick={() => user.status === "Banned" ? handleUnbanUser(user) : handleBanUser(user)}
                                    >
                                      {user.status === "Banned" ? "Unban" : "Ban"} User
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {stats.activeJobs} Active
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  {jobs.filter(j => j.reported).length} Reported
                </Badge>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Poster</TableHead>
                        <TableHead>Washer</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id} className={`border-border ${job.reported ? 'bg-red-500/5' : ''}`}>
                          <TableCell className="font-mono text-muted-foreground">#{job.id}</TableCell>
                          <TableCell className="text-foreground">{job.type}</TableCell>
                          <TableCell className="text-muted-foreground">{job.poster}</TableCell>
                          <TableCell className="text-muted-foreground">{job.washer || "—"}</TableCell>
                          <TableCell className="text-foreground font-medium">₦{job.price.toLocaleString()}</TableCell>
                          <TableCell className="text-muted-foreground">{job.location}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusBadge(job.status)}>
                                {job.status}
                              </Badge>
                              {job.reported && (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{job.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Delete Job</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to delete job #{job.id}? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button variant="destructive" onClick={() => handleDeleteJob(job)}>
                                      Delete Job
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4 text-center">
                    <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">89%</p>
                    <p className="text-sm text-muted-foreground">Job Completion Rate</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">₦3,200</p>
                    <p className="text-sm text-muted-foreground">Avg. Job Value</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">4.7</p>
                    <p className="text-sm text-muted-foreground">Avg. User Rating</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-4 text-center">
                    <Briefcase className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">2.3hrs</p>
                    <p className="text-sm text-muted-foreground">Avg. Job Duration</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[180, 220, 195, 280, 310, 290, 350, 420, 380, 450, 520, 580].map((value, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div 
                            className="w-full bg-green-500/20 rounded-t-lg hover:bg-green-500/30 transition-colors"
                            style={{ height: `${(value / 580) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Dec</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[50, 80, 120, 180, 250, 340, 420, 520, 650, 800, 980, 1247].map((value, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                          <div 
                            className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                            style={{ height: `${(value / 1247) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Dec</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Reported Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobs.filter(j => j.reported).map((job) => (
                    <div key={job.id} className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-foreground">Job #{job.id}: {job.type}</h4>
                          <p className="text-sm text-muted-foreground">Posted by {job.poster} • {job.location}</p>
                          <p className="text-sm text-yellow-400 mt-2">Reported for: Inappropriate content</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-400 border-green-500/30">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Dismiss
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {jobs.filter(j => j.reported).length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-foreground font-medium">All clear!</p>
                      <p className="text-sm text-muted-foreground">No reported content at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
