import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star, SlidersHorizontal } from "lucide-react";
import Loader from "./Loaderpage/Loader";
import { API_URLS } from "../components/utils/apiConfig";
import Swal from "sweetalert2";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // View Details Modal logic
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_URLS.getcreatepost);
        const data = await res.json();
        setJobs(data);
        console.log(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.hostel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || job.type?.toLowerCase() === selectedType.toLowerCase();

    // const matchesLocation =
    //   selectedLocation === "all" ||
    //   job.hostel?.toLowerCase() === selectedLocation.toLowerCase();
    const matchesLocation = selectedLocation === "all" || job.hostel?.toLowerCase() === selectedLocation.toLowerCase(); return matchesSearch && matchesType && matchesLocation;
  });

  // Apply for job
  const handleApplyJob = async (jobId) => {

    const currentUser = JSON.parse(sessionStorage.getItem("laundryUser"));

    const result = await Swal.fire({
      title: "Apply for this job?",
      text: "Are you sure you want to apply?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply",
      cancelButtonText: "No",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {

      try {

        const res = await fetch(
          API_URLS.userapplyjob,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jobId,
              userId: currentUser.id,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {

          // ✅ UPDATE UI IMMEDIATELY WITHOUT REFRESH
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job._id === jobId
                ? {
                  ...job,
                  status: "Applied",
                  applicant: currentUser.id,
                }
                : job
            )
          );

          Swal.fire({
            title: "Applied!",
            text: data.message || "You have applied successfully.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });

        } else {

          Swal.fire({
            title: "Failed!",
            text: data.message || "Could not apply.",
            icon: "error",
          });

        }

      } catch (err) {

        console.error(err);

        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Try again.",
          icon: "error",
        });

      }
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    // expects "14:30" or "14:30:00"
    const [hour, minute] = time.split(":");

    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Clinq <span className="text-gradient">Jobs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find Clinq jobs near you and start earning today.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-card border rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by type, location, or keyword..."
                  className="pl-12 h-12 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="h-12 px-4 rounded-xl bg-background border border-border text-foreground"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="washing">Washing</option>
                <option value="ironing">Ironing</option>
                <option value="full">Full Service</option>
              </select>

              <select
                className="h-12 px-4 rounded-xl bg-background border border-border text-foreground"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">All Locations</option>

                <option value="Male Hostel 1">Male Hostel 1</option>
                <option value="Male Hostel 2">Male Hostel 2</option>

                <option value="Female Hostel 1">Female Hostel 1</option>
                <option value="Female Hostel 2">Female Hostel 2</option>
                <option value="Female Hostel 3">Female Hostel 3</option>
              </select>

              <Button variant="outline" className="h-12 px-4">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Loading */}
          {loading && <Loader />}

          {/* Results Count */}
          {!loading && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium shadow-sm">
                Showing <span className="text-primary">{filteredJobs.length}</span> jobs
              </span>
            </div>
          )}


          {/* Job Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Job Type & Price */}
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {job.type}
                    </Badge>
                    <span className="text-2xl font-bold text-primary">
                      ₦{Number(job.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Description: {job.description || "No description"}
                  </p>
                  {/* <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Gender: {job.userId?.gender || "No Gender Specified"}
                  </p> */}

                  {/* Location & Due */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {job.hostel}, {job.block}, {job.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Due Time: {formatDate(job.deliveryDate)} • {formatTime(job.deliveryTime)}</span>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {job.userId?.fullname?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {job.userId?.fullname || "Unknown User"}
                        </p>
                        <div className="flex items-center gap-1">
                          {/* <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> */}
                          <span className="text-xs text-muted-foreground font-medium">{job.userId?.gender || "No Gender Specified"}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Posted:{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    {/* View Details Outline */}
                    <Button
                      variant="outline"
                      className="flex-1 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition-colors"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>

                    {/* Apply Outline in Red */}
                    <Button
                      variant="outline"
                      disabled={job.status === "Applied"}
                      className={`
    flex-1 border transition-colors
    ${job.status === "Applied"
                          ? "border-gray-400 text-gray-400 cursor-not-allowed bg-gray-100"
                          : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        }
  `}
                      onClick={() => handleApplyJob(job._id)}
                    >
                      {job.status === "Applied" ? "Already Applied" : "Apply"}
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-background to-primary/10 border-none shadow-2xl animate-fade-in fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary flex items-center gap-2">
              <span>Job & User Details</span>
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Explore all information about this job and the user who posted it.
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              {/* Job Info */}
              <div className="bg-card/80 rounded-xl p-5 shadow-md border border-primary/10">
                <h3 className="text-lg font-semibold mb-2 text-primary flex items-center gap-2">🧺 Job Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-muted-foreground">Service Type</span>
                    <span className="font-semibold text-foreground">{selectedJob.type}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Price</span>
                    <span className="font-semibold text-primary">₦{Number(selectedJob.price).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Status</span>
                    <Badge className="w-fit">{selectedJob.status || "Open"}</Badge>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Quantity</span>
                    <span className="font-semibold">{selectedJob.quantity || "—"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs text-muted-foreground">Description</span>
                    <span className="text-sm">{selectedJob.description || "No description provided"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs text-muted-foreground">Location</span>
                    <span className="text-sm">{selectedJob.hostel}, {selectedJob.block}, {selectedJob.room}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Delivery Date</span>
                    <span className="text-sm">{formatDate(selectedJob.deliveryDate)}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Delivery Time</span>
                    <span className="text-sm">{formatTime(selectedJob.deliveryTime)}</span>
                  </div>
                </div>
              </div>
              {/* User Info */}
              <div className="bg-gradient-to-r from-primary/10 to-background rounded-xl p-5 shadow-md border border-primary/10">
                <h3 className="text-lg font-semibold mb-2 text-primary flex items-center gap-2">👤 User Information</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                      {selectedJob.userId?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg text-foreground">{selectedJob.userId?.fullname || "Unknown User"}</div>
                    {/* <div className="text-sm text-muted-foreground">{selectedJob.userId?.email || "No email"}</div> */}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-muted-foreground">Gender</span>
                    <span className="text-sm">{selectedJob.userId?.gender || "Not specified"}</span>
                  </div>
                  {/* <div>
                    <span className="block text-xs text-muted-foreground">Phone</span>
                    <span className="text-sm">{selectedJob.userId?.phone || "Not specified"}</span>
                  </div> */}
                  <div>
                    <span className="block text-xs text-muted-foreground">University</span>
                    <span className="text-sm">{selectedJob.userId?.university || "Elizade University"}</span>
                  </div>
                  {/* <div>
                    <span className="block text-xs text-muted-foreground">Room</span>
                    <span className="text-sm">{selectedJob.room || "Not specified"}</span>
                  </div> */}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="w-full">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Browse;
