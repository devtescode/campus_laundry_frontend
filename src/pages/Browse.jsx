import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star, SlidersHorizontal } from "lucide-react";
import Loader from "./Loaderpage/Loader";

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/userlaundry/getcreatepost");
        const data = await res.json();
        setJobs(data);
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

    const matchesLocation =
      selectedLocation === "all" || job.hostel?.toLowerCase() === selectedLocation.toLowerCase();

    return matchesSearch && matchesType && matchesLocation;
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
  });

  if (result.isConfirmed) {
    try {
      const res = await fetch("http://localhost:5000/userlaundry/userapplyjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, userId: currentUser.id }), // send userId
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Applied!", data.message || "You have applied successfully.", "success");
        // Optionally, update UI state here to reflect status change
      } else {
        Swal.fire("Failed!", data.message || "Could not apply.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong. Try again.", "error");
    }
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Laundry <span className="text-gradient">Jobs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find laundry jobs near you and start earning today.
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
                <option value="jaja">Jaja Hall</option>
                <option value="moremi">Moremi Hall</option>
                <option value="fagunwa">Fagunwa Hall</option>
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

                  {/* Location & Due */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {job.hostel} {job.block} {job.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Due Time: {job.deliveryDate} {job.deliveryTime}</span>
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
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">4.8</span>
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
                      // className="flex-1 border border-gray-400 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                      className="flex-1 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition-colors"
                      onClick={() => handleViewDetails(job)}
                    >
                      View Details
                    </Button>

                    {/* Apply Outline in Red */}
                    <Button
                      variant="outline"
                      className="flex-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      onClick={() => handleApplyJob(job._id)}
                    >
                      Apply
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;
