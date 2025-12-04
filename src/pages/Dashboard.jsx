import { useState } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  Star, 
  Bell, 
  CheckCircle,
  Package,
  TrendingUp,
  Calendar,
  MapPin,
  MessageSquare,
  Eye,
  Plus,
  Shirt,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const posterStats = {
  jobsPosted: 12,
  pendingJobs: 3,
  completedJobs: 9,
  totalSpent: 45000,
  averageRating: 4.8
};

const washerStats = {
  jobsAccepted: 24,
  completedJobs: 21,
  pendingJobs: 3,
  totalEarnings: 85000,
  averageRating: 4.9,
  thisWeekEarnings: 15000
};

const posterJobs = [
  {
    id: 1,
    type: "Washing & Ironing",
    quantity: "8 items",
    price: 3500,
    status: "In Progress",
    washer: "Adaeze N.",
    washerRating: 4.9,
    postedDate: "2 days ago",
    location: "Block A, Room 24"
  },
  {
    id: 2,
    type: "Washing Only",
    quantity: "5 items",
    price: 2000,
    status: "Completed",
    washer: "Tunde O.",
    washerRating: 4.7,
    postedDate: "1 week ago",
    location: "Block A, Room 24"
  },
  {
    id: 3,
    type: "Ironing Only",
    quantity: "12 items",
    price: 2500,
    status: "Pending",
    washer: null,
    postedDate: "1 hour ago",
    location: "Block A, Room 24"
  }
];

const washerJobs = [
  {
    id: 1,
    type: "Washing & Ironing",
    quantity: "8 items",
    price: 3500,
    status: "In Progress",
    poster: "Chidi M.",
    posterRating: 4.8,
    acceptedDate: "2 days ago",
    location: "Block C, Room 15",
    deadline: "Tomorrow, 5PM"
  },
  {
    id: 2,
    type: "Washing Only",
    quantity: "15 items",
    price: 5000,
    status: "Completed",
    poster: "Amara K.",
    posterRating: 4.9,
    acceptedDate: "3 days ago",
    location: "Block B, Room 8",
    deadline: "Completed"
  },
  {
    id: 3,
    type: "Washing & Folding",
    quantity: "10 items",
    price: 4000,
    status: "Pending Pickup",
    poster: "Emeka O.",
    posterRating: 4.6,
    acceptedDate: "Today",
    location: "Block D, Room 22",
    deadline: "Friday, 2PM"
  }
];

const notifications = [
  { id: 1, message: "Your laundry job has been accepted by Adaeze N.", time: "2 hours ago", unread: true },
  { id: 2, message: "New message from Tunde O. about your order", time: "5 hours ago", unread: true },
  { id: 3, message: "Job completed! Rate your experience with Amara K.", time: "1 day ago", unread: false },
  { id: 4, message: "Payment received for job #1234", time: "2 days ago", unread: false }
];

const earningsData = [
  { day: "Mon", amount: 2500 },
  { day: "Tue", amount: 4000 },
  { day: "Wed", amount: 3500 },
  { day: "Thu", amount: 5000 },
  { day: "Fri", amount: 0 },
  { day: "Sat", amount: 0 },
  { day: "Sun", amount: 0 }
];

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "In Progress":
      return "bg-primary/20 text-primary border-primary/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Pending Pickup":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Dashboard = () => {
  const [role, setRole] = useState("poster");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Chidi! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your laundry today
              </p>
            </div>
            
            {/* Role Switch */}
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-1">
              <Button
                variant={role === "poster" ? "default" : "ghost"}
                size="sm"
                onClick={() => setRole("poster")}
                className="flex items-center gap-2"
              >
                <Package className="w-4 h-4" />
                As Poster
              </Button>
              <Button
                variant={role === "washer" ? "default" : "ghost"}
                size="sm"
                onClick={() => setRole("washer")}
                className="flex items-center gap-2"
              >
                <Shirt className="w-4 h-4" />
                As Washer
              </Button>
            </div>
          </div>

          {/* Poster Dashboard */}
          {role === "poster" && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{posterStats.jobsPosted}</p>
                        <p className="text-xs text-muted-foreground">Jobs Posted</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{posterStats.pendingJobs}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{posterStats.completedJobs}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">₦{posterStats.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{posterStats.averageRating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Jobs List */}
                <div className="lg:col-span-2">
                  <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Your Posted Jobs</CardTitle>
                      <Button size="sm" onClick={() => navigate('/post-job')} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Post New Job
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {posterJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">{job.type}</h3>
                              <p className="text-sm text-muted-foreground">{job.quantity}</p>
                            </div>
                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {job.postedDate}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {job.washer ? (
                                <>
                                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="text-xs font-medium text-primary">{job.washer.charAt(0)}</span>
                                  </div>
                                  <span className="text-sm text-foreground">{job.washer}</span>
                                  <span className="flex items-center text-xs text-yellow-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    {job.washerRating}
                                  </span>
                                </>
                              ) : (
                                <span className="text-sm text-muted-foreground">Waiting for washer...</span>
                              )}
                            </div>
                            <span className="font-bold text-primary">₦{job.price.toLocaleString()}</span>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            {job.washer && (
                              <Button variant="outline" size="sm" className="flex-1">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Message
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Notifications */}
                <div>
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notifications
                        <Badge className="bg-accent text-accent-foreground ml-auto">
                          {notifications.filter(n => n.unread).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.unread 
                              ? "bg-primary/10 border border-primary/20" 
                              : "bg-background border border-border"
                          }`}
                        >
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Washer Dashboard */}
          {role === "washer" && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{washerStats.jobsAccepted}</p>
                        <p className="text-xs text-muted-foreground">Jobs Accepted</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{washerStats.completedJobs}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{washerStats.pendingJobs}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">₦{washerStats.totalEarnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total Earnings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">₦{washerStats.thisWeekEarnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">This Week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{washerStats.averageRating}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Jobs List */}
                <div className="lg:col-span-2">
                  <Card className="bg-card border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Your Active Jobs</CardTitle>
                      <Button size="sm" onClick={() => navigate('/browse')} className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Browse Jobs
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {washerJobs.map((job) => (
                        <div
                          key={job.id}
                          className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-foreground">{job.type}</h3>
                              <p className="text-sm text-muted-foreground">{job.quantity}</p>
                            </div>
                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {job.deadline}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                                <span className="text-xs font-medium text-accent">{job.poster.charAt(0)}</span>
                              </div>
                              <span className="text-sm text-foreground">{job.poster}</span>
                              <span className="flex items-center text-xs text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                {job.posterRating}
                              </span>
                            </div>
                            <span className="font-bold text-green-500">+₦{job.price.toLocaleString()}</span>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Message
                            </Button>
                            {job.status === "In Progress" && (
                              <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Earnings Chart & Notifications */}
                <div className="space-y-6">
                  {/* Weekly Earnings */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Weekly Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between h-32 gap-2">
                        {earningsData.map((day, index) => (
                          <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div 
                              className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/30"
                              style={{ 
                                height: `${(day.amount / 5000) * 100}%`,
                                minHeight: day.amount > 0 ? "8px" : "4px"
                              }}
                            />
                            <span className="text-xs text-muted-foreground">{day.day}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total This Week</span>
                          <span className="font-bold text-green-500">₦{washerStats.thisWeekEarnings.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notifications
                        <Badge className="bg-accent text-accent-foreground ml-auto">
                          {notifications.filter(n => n.unread).length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.unread 
                              ? "bg-primary/10 border border-primary/20" 
                              : "bg-background border border-border"
                          }`}
                        >
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
