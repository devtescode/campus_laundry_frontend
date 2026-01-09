import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";

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
  Users,
  HouseIcon,
  Trash,
  HousePlugIcon,
  LucideHouse
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loaderpage/Loader";
import axios from "axios";

const posterStats = {
  jobsPosted: 12,
  pendingJobs: 3,
  completedJobs: 9,
  totalSpent: 45000,
  averageRating: 4.8
};

// const washerStats = {
//   jobsAccepted: 24,
//   completedJobs: 21,
//   pendingJobs: 3,
//   totalEarnings: 85000,
//   averageRating: 4.9,
//   thisWeekEarnings: 15000
// };


// const washerJobs = [
//   {
//     id: 1,
//     type: "Washing & Ironing",
//     quantity: "8 items",
//     price: 3500,
//     status: "In Progress",
//     poster: "Chidi M.",
//     posterRating: 4.8,
//     acceptedDate: "2 days ago",
//     location: "Block C, Room 15",
//     deadline: "Tomorrow, 5PM"
//   },
//   {
//     id: 2,
//     type: "Washing Only",
//     quantity: "15 items",
//     price: 5000,
//     status: "Completed",
//     poster: "Amara K.",
//     posterRating: 4.9,
//     acceptedDate: "3 days ago",
//     location: "Block B, Room 8",
//     deadline: "Completed"
//   },
//   {
//     id: 3,
//     type: "Washing & Folding",
//     quantity: "10 items",
//     price: 4000,
//     status: "Pending Pickup",
//     poster: "Emeka O.",
//     posterRating: 4.6,
//     acceptedDate: "Today",
//     location: "Block D, Room 22",
//     deadline: "Friday, 2PM"
//   }
// ];

// const notifications = [
//   { id: 1, message: "Your laundry job has been accepted by Adaeze N.", time: "2 hours ago", unread: true },
//   { id: 2, message: "New message from Tunde O. about your order", time: "5 hours ago", unread: true },
//   { id: 3, message: "Job completed! Rate your experience with Amara K.", time: "1 day ago", unread: false },
//   { id: 4, message: "Payment received for job #1234", time: "2 days ago", unread: false }
// ];

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

const [washerStats, setWasherStats] = useState({
  jobsAccepted: 0,             // total jobs applied by washer
  completedJobs: 0,            // completed jobs
  appliedJobs: 0,              // current active jobs (not completed)
  currentJobsTotalPrice: 0,    // total price of current applied jobs
  completedEarnings: 0,        // total earnings from completed jobs
  jobPrices: [],               // array of { jobId, price, status }
});

useEffect(() => {
  if (role !== "washer") return;

  const user = JSON.parse(sessionStorage.getItem("laundryUser"));
  if (!user?.token) return;

  console.log("Fetching washer stats for user:", user);

  fetch("http://localhost:5000/userlaundry/washerstats", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      setWasherStats({
        jobsAccepted: data.jobsAccepted || 0,
        completedJobs: data.completedJobs || 0,
        appliedJobs: data.appliedJobs || 0,
        currentJobsTotalPrice: data.currentJobsTotalPrice || 0,
        completedEarnings: data.completedEarnings || 0,
        jobPrices: Array.isArray(data.jobPrices) ? data.jobPrices : [],
      });
    })
    .catch(err => console.error("Failed to fetch washer stats:", err));
}, [role]);


  const navigate = useNavigate();

  const [posterJobs, setPosterJobs] = useState([]);
  const [loading, setLoadingJobs] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("laundryUser"));
    const userId = user?.id;

    const fetchUserJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/userlaundry/getuserpost/${userId}`);
        const data = await res.json();
        setPosterJobs(data.jobs);
        console.log(data.jobs, "Fetched Jobs");

      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchUserJobs();
  }, []);



  const [washerJobs, setWasherJobs] = useState([]);
  const [loadin, setLoadingJob] = useState(true);

  useEffect(() => {
    const fetchWasherJobs = async () => {
      // const washerId = currentUser._id; // logged-in washer
      try {
        const washerId = JSON.parse(sessionStorage.getItem("laundryUser")).id;
        const res = await fetch(
          `http://localhost:5000/userlaundry/getWasherJobs/${washerId}`
        );
        const data = await res.json();
        console.log(data, "dataaaaaaaaaaaaaaaa");

        setWasherJobs(data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchWasherJobs();
  }, []);


  const [selectedJob, setSelectedJob] = useState(null);
  const [openModal, setOpenModal] = useState(false);


  // Function to handle opening the modal
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  // Function to handle deleting a job
  // import Swal from "sweetalert2";

  const handleDeleteJob = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/userlaundry/delectuserpost/${jobId}`, {
          method: "DELETE",
        });

        Swal.fire("Deleted!", "Job deleted successfully.", "success");
        setPosterJobs((prev) => prev.filter((job) => job._id !== jobId));
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete job.", "error");
      }
    }
  };

  // const [notifications, setNotifications] = useState([]);

  // `http://localhost:5000/userlaundry/notifications/${user.id}`
  const [notifications, setNotifications] = useState([]);

  const userId = JSON.parse(sessionStorage.getItem("laundryUser")).id;

  useEffect(() => {
    axios.get(`http://localhost:5000/userlaundry/notifications/${userId}`)
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const user = JSON.parse(sessionStorage.getItem("laundryUser"));
  const firstName = user?.fullname?.split(" ")[0] || "User";









  const handleCompleteJob = async (jobId) => {
    const washerId = JSON.parse(sessionStorage.getItem("laundryUser")).id;

    const result = await Swal.fire({
      title: "Mark job as completed?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, complete job",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(
      `http://localhost:5000/userlaundry/completejob/${jobId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ washerId }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      Swal.fire("Completed!", data.message, "success");

      // Update UI instantly
      setWasherJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: "Completed" } : job
        )
      );
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };


  // Helper functions
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Inside your component JSX




  const [chatJob, setChatJob] = useState(null);
  const openChat = (job) => {
    setChatJob(job);
  };
  const ChatModal = ({ job, onClose }) => {
    const user = JSON.parse(localStorage.getItem("laundryUser"));
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [loadingMessages, setLoadingMessages] = useState(true); // new
    useEffect(() => {
      // Lock the body scroll when modal is open
      document.body.style.overflow = "hidden";
      return () => {
        // Restore scroll when modal closes
        document.body.style.overflow = "auto";
      };
    }, []);


    useEffect(() => {
      fetch(`http://localhost:5000/userlaundry/getmessages/${job._id}`, {
        // method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      })
        // .then(res => res.json())
        // .then(setMessages);
        .then(res => res.json())
        .then(data => {
          setMessages(Array.isArray(data) ? data : []);
          setLoadingMessages(false); // done loading
        })
        .catch(err => {
          console.error(err);
          setLoadingMessages(false);
        });
    }, [job._id]);

    const sendMessage = async () => {
      if (!text.trim()) return;

      const senderId = user.id;

      const receiverId =
        senderId === String(job.userId?._id || job.userId)
          ? job.applicant // washer
          : String(job.userId?._id || job.userId); // poster

      if (!receiverId) {
        alert("Cannot send message: receiver not defined yet!");
        return;
      }

      const messageData = {
        jobId: job._id,
        senderId,
        receiverId,
        text,
      };

      try {
        // Send to server
        const response = await fetch("http://localhost:5000/userlaundry/sendmessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) throw new Error("Failed to send message");

        // Add the new message to the messages array immediately
        setMessages(prev => [
          ...prev,
          {
            _id: Math.random().toString(36).substring(2), // temporary ID for React key
            text,
            sender: { _id: senderId },
            createdAt: new Date().toISOString(),
          },
        ]);

        setText(""); // clear input
      } catch (err) {
        console.error(err);
        alert("Failed to send message");
      }
    };





    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 w-full h-full p-2">
        <div className="bg-card w-full max-w-md rounded-xl shadow-xl flex flex-col p-4 max-h-[75vh]">

          {/* Header */}
          <div className="flex justify-between items-center mb-3 border-b border-border pb-2">
            <span className="font-semibold text-lg">Chat</span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-red-500 transition-colors text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-3 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-muted/20 px-1">
            {loadingMessages ? (
              <p className="text-center text-sm text-muted-foreground mt-2">Loading messages...</p>
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-2 rounded-lg max-w-[75%] break-words ${msg.sender?._id === user.id ? "ml-auto bg-primary text-white" : "bg-muted text-foreground"
                    }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground mt-2">
                No messages yet.
              </p>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              className="flex-1 border rounded-md px-3 py-2 text-sm resize-none h-[50px]"
              placeholder="Type a message..."
            />
            <Button onClick={sendMessage} className="min-w-[70px]">
              Send
            </Button>
          </div>
        </div>
      </div>
    );

  };










  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>

              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome back, <span className="text-primary">{firstName}!</span>
              </h2>

              <p className="text-muted-foreground">
                Here's what's happening with your laundry today
              </p>
            </div>
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
              <div className="grid lg:grid-cols-3 gap-1">
                {/* Jobs List */}
                <div className="lg:col-span-2">
                  <Card className="bg-card border-border border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Your Posted Jobs</CardTitle>
                      <Button size="sm" onClick={() => navigate('/post-job')} className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Post New Job
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="px-0 py-2">
                        {loading ? (
                          <Loader />
                        ) : posterJobs.length === 0 ? (
                          <p className="text-center text-muted-foreground py-10">
                            No jobs posted yet.
                          </p>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {posterJobs.map((job) => (
                              <div
                                key={job._id}
                                className="p-5 rounded-md border border-border hover:border-primary/30 transition-all w-full"
                              >
                                {/* JOB HEADER */}
                                <div className="flex flex-wrap items-start justify-between mb-3 w-full gap-2">
                                  <div className="flex-1 min-w-[120px]">
                                    <h3 className="font-semibold text-foreground truncate">{job.type}</h3>
                                    <p className="text-sm text-muted-foreground truncate">
                                      {job.quantity || "No quantity specified"} Items
                                    </p>
                                  </div>
                                  <Badge className={getStatusColor(job.status)}>
                                    {job.status || "Pending"}
                                  </Badge>
                                </div>

                                {/* META INFO */}
                                <div className="flex flex-wrap gap-0 text-sm text-muted-foreground mb-3">
                                  <span className="flex items-center gap-1 min-w-[50px]">
                                    <MapPin className="w-3 h-3" />
                                    {job.hostel || "No location"}
                                  </span>
                                  <span className="flex items-center gap-1 min-w-[50px]">
                                    <LucideHouse className="w-3 h-3" />
                                    {job.room || "No room"}
                                  </span>
                                  <span className="flex items-center gap-1 min-w-[120px]">
                                    <Calendar className="w-3 h-3" />
                                    {job.createdAt
                                      ? new Date(job.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                      : "No date"}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                                  <div className="flex items-center gap-2 flex-wrap min-w-[120px]">
                                    {job.applicantName ? (
                                      <>
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                          <span className="text-xs font-medium text-primary">
                                            {job.applicantName.charAt(0)}
                                          </span>
                                        </div>
                                        <span className="text-sm text-foreground truncate">
                                          {job.applicantName}
                                          {job.status === "Completed" && (
                                            <span className="ml-1 text-xs text-green-600">(Completed)</span>
                                          )}
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-sm text-muted-foreground truncate">
                                        Waiting for washer...
                                      </span>
                                    )}


                                  </div>

                                  <span className="font-bold text-primary min-w-[80px]">
                                    ₦{Number(job.price || 0).toLocaleString()}
                                  </span>
                                </div>

                                {/* <span className="flex items-center text-xs text-yellow-500">
                                      <Star className="w-3 h-3 fill-current" />
                                      {job.washerRating || "0.0"}
                                    </span> */}
                                {/* BUTTONS */}
                                <div className="flex flex-wrap gap-2 mt-3 w-full">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 min-w-[100px]"
                                    onClick={() => handleViewDetails(job)}
                                  >
                                    <Eye className="w-3 h-3" /> View Details
                                  </Button>
                                  {job.status === "Applied" && (
                                    <Button variant="outline" size="sm" className="flex-1 min-w-[100px]" onClick={() => openChat(job)}>
                                      <MessageSquare className="w-3 h-3" /> Message
                                    </Button>

                                  )}
                                  {chatJob && (
                                    <ChatModal
                                      job={chatJob}
                                      onClose={() => setChatJob(null)}
                                    />
                                  )}

                                  {job.status === "Applied" && (
                                    <Button
                                      disabled={job.status !== "Pending"}
                                      variant=""
                                      size="sm"
                                      className="flex-1 min-w-[100px]"
                                      onClick={() => handleDeleteJob(job._id)}
                                    >
                                      <Trash className="w-3 h-3" /> Cancel
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                </div>





                {selectedJob && (
                  <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogContent className="w-[95%] sm:max-w-lg rounded-xl p-4 max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">
                          Job Details
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">

                        {/* Job Type + Quantity */}
                        <div className="bg-muted/40 p-3 rounded-lg">
                          <h3 className="text-lg font-semibold text-foreground">
                            {selectedJob.type}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedJob.quantity} items
                          </p>
                        </div>

                        {/* Location */}
                        <div className="bg-muted/40 p-3 rounded-lg flex items-center gap-2 text-sm">
                          <MapPin className="w-5 h-5 text-primary" />
                          <p className="text-muted-foreground">
                            {selectedJob.hostel}, Block {selectedJob.block}, Room {selectedJob.room}
                          </p>
                        </div>

                        {/* Dates */}
                        <div className="bg-muted/40 p-3 rounded-lg space-y-1 text-sm">
                          <p>
                            <strong>Posted:</strong>{" "}
                            {selectedJob.createdAt
                              ? new Date(selectedJob.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "No date"}{" "}
                            at {selectedJob.createdAt ? selectedJob.createdAt.split("T")[1].substring(0, 5) : "No time"}
                          </p>

                          <p>
                            <strong>Pickup:</strong>{" "}
                            {selectedJob.pickupDate
                              ? new Date(selectedJob.pickupDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "No date"}{" "}
                            at {selectedJob.pickupTime}
                          </p>

                          <p>
                            <strong>Delivery:</strong>{" "}
                            {selectedJob.deliveryDate
                              ? new Date(selectedJob.deliveryDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "No date"}{" "}
                            at {selectedJob.deliveryTime}
                          </p>
                        </div>

                        {/* Description */}
                        {selectedJob.description && (
                          <div className="bg-muted/40 p-3 rounded-lg text-sm">
                            <strong>Description:</strong>
                            <p className="text-muted-foreground leading-5">
                              {selectedJob.description}
                            </p>
                          </div>
                        )}

                        {/* Price + Status */}
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-primary text-lg">
                            ₦{selectedJob.price.toLocaleString()}
                          </p>

                          <Badge className={getStatusColor(selectedJob.status)}>
                            {selectedJob.status}
                          </Badge>
                        </div>
                      </div>

                      <DialogFooter className="pt-3">
                        <Button
                          variant="secondary"
                          className="w-full"
                          onClick={() => setOpenModal(false)}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}


                {/* Notifications */}
                <div>
                  <Card className="bg-card border-border border-none">
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
                      {/* {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${notification.unread
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background border border-border"
                            }`}
                        >
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))} */}

                      {notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`p-3 rounded-lg ${notification.unread
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background border border-border"
                            }`}
                        >
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
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
                        {/* Applied Jobs: {washerStats.appliedJobs}  */}
                        <p className="text-2xl font-bold text-foreground">
                           {washerStats.appliedJobs} 
                        </p>
                        <p className="text-xs text-muted-foreground">Applied Jobs</p>
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
                        {/* Completed Jobs: {washerStats.completedJobs} */}
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
                        {/* <p className="text-2xl font-bold text-foreground">{washerStats.jobPrices}</p> */}

                        {/* {washerStats.jobPrices.length > 0 ? (
                          washerStats.jobPrices.map(job => (
                            <p className="text-2xl font-bold text-foreground" key={job.jobId}>
                               ₦{job.price.toLocaleString()} 
                            </p>
                          ))
                        ) : (
                          <p>0</p>
                        )} */}

                        <p className="text-2xl font-bold text-foreground">₦{washerStats.currentJobsTotalPrice.toLocaleString()}</p>                        
                        <p className="text-xs text-muted-foreground">Current Jobs Total Price</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        {/* <DollarSign className="w-5 h-5 text-accent" /> */}
                        <b  className="w-5 h-5 text-accent text-center">₦</b>
                      </div>
                      <div>

                        <p className="text-2xl font-bold text-foreground"> ₦{washerStats.completedEarnings.toLocaleString()}</p>
                        {/* <p className="text-2xl font-bold text-foreground">₦{washerStats.totalEarnings.toLocaleString()}</p>  */}
                        <p className="text-xs text-muted-foreground">Earnings</p>
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
                        {/* <p className="text-2xl font-bold text-foreground">₦{washerStats.thisWeekEarnings.toLocaleString()}</p> */}
                        {/* <p className="text-xs text-muted-foreground">This Week</p> */}
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

                      {loadin ? (
                        <div className="py-20 flex justify-center">
                          <Loader />
                        </div>
                      ) : washerJobs.length === 0 ? (
                        <p className="text-center text-muted-foreground py-10">
                          No jobs available at the moment.
                        </p>
                      ) : (
                        washerJobs.map((job) => (
                          <div
                            key={job._id}
                            className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-foreground">{job.type}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {job.quantity} clothes
                                </p>
                              </div>
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.hostel}, {job.block} {job.room}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {job.pickupDate}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                                  <span className="text-xs font-medium text-accent">
                                    {job.userId.fullname.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm text-foreground">
                                  {job.userId.fullname}
                                </span>
                              </div>
                              <span className="font-bold text-green-500">
                                ₦{job.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm" className="flex-1" onClick={() => openChat(job)}>
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Message
                              </Button>
                              {chatJob && (
                                <ChatModal
                                  job={chatJob}
                                  onClose={() => setChatJob(null)}
                                />
                              )}

                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() =>
                                  Swal.fire({
                                    title: "Job Details",
                                    html: `
                                        <p><b>Poster:</b> ${job.userId.fullname}</p>
                                        <p><b>Phone Number:</b> ${job.userId.phonenumber}</p>
                                        <p><b>Pickup:</b> ${formatDate(job.pickupDate)} ${formatTime(job.pickupTime)}</p>
                                        <p><b>Delivery:</b> ${formatDate(job.deliveryDate)} ${formatTime(job.deliveryTime)}</p>
                                        <p><b>Description:</b> ${job.description}</p>
                                        <p><b>Hostel:</b> ${job.hostel}</p>
                                        <p><b>Block:</b> ${job.block}</p>
                                        <p><b>Room:</b> ${job.room}</p>
                                      `,
                                    // icon: "info",
                                  })
                                }
                              >
                                View More
                              </Button>

                              {job.status !== "Completed" && (
                                <Button
                                  size="sm"
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                  onClick={() => handleCompleteJob(job._id)}
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}

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
                          {/* <span className="font-bold text-green-500">₦{washerStats.thisWeekEarnings.toLocaleString()}</span> */}
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
                        {/* <Badge className="bg-accent text-accent-foreground ml-auto">
                          {notifications.filter(n => n.unread).length}
                        </Badge> */}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* {notifications.slice(0, 3).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${notification.unread
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-background border border-border"
                            }`}
                        >
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      ))} */}
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
