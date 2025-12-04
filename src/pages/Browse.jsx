import { useState } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star, Filter, SlidersHorizontal } from "lucide-react";

const jobs = [
  {
    id: 1,
    type: "Washing & Ironing",
    quantity: "8 items",
    price: 3500,
    location: "Jaja Hall, Block A",
    university: "UNILAG",
    postedBy: "Chidi M.",
    rating: 4.8,
    timePosted: "2 hours ago",
    deadline: "Tomorrow, 5PM",
    description: "Need someone to wash and iron my clothes. Mostly shirts and trousers."
  },
  {
    id: 2,
    type: "Washing Only",
    quantity: "15 items",
    price: 5000,
    location: "Amina Hall, Block C",
    university: "UNILAG",
    postedBy: "Amara K.",
    rating: 4.9,
    timePosted: "4 hours ago",
    deadline: "Friday, 2PM",
    description: "Large load of casual clothes that need washing."
  },
  {
    id: 3,
    type: "Ironing Only",
    quantity: "12 items",
    price: 2500,
    location: "Moremi Hall",
    university: "UNILAG",
    postedBy: "Tunde O.",
    rating: 4.5,
    timePosted: "1 day ago",
    deadline: "Saturday, 10AM",
    description: "Formal shirts and native wear that need professional ironing."
  },
  {
    id: 4,
    type: "Washing & Folding",
    quantity: "20 items",
    price: 6000,
    location: "El-Kanemi Hall",
    university: "UNILAG",
    postedBy: "Emeka O.",
    rating: 4.7,
    timePosted: "3 hours ago",
    deadline: "Sunday, 6PM",
    description: "Mix of clothes including bedsheets. Need them washed and folded neatly."
  },
  {
    id: 5,
    type: "Full Service",
    quantity: "10 items",
    price: 4500,
    location: "Fagunwa Hall",
    university: "UNILAG",
    postedBy: "Ngozi P.",
    rating: 4.6,
    timePosted: "5 hours ago",
    deadline: "Monday, 12PM",
    description: "Complete laundry service needed - wash, dry, iron and fold."
  },
  {
    id: 6,
    type: "Washing & Ironing",
    quantity: "6 items",
    price: 2800,
    location: "Biobaku Hall",
    university: "UNILAG",
    postedBy: "Kemi A.",
    rating: 4.4,
    timePosted: "6 hours ago",
    deadline: "Tomorrow, 8AM",
    description: "Urgent! Need my work clothes ready for tomorrow."
  }
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || job.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesLocation = selectedLocation === "all" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          {/* style={{marginTop:"70px"}} */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Laundry <span className="text-gradient">Jobs</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find laundry jobs near you and start earning today. Filter by type, location, and price.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
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
              <div className="flex gap-3">
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
                  <option value="amina">Amina Hall</option>
                  <option value="moremi">Moremi Hall</option>
                  <option value="fagunwa">Fagunwa Hall</option>
                </select>
                <Button variant="outline" className="h-12 px-4">
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredJobs.length}</span> jobs
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="bg-transparent border-none text-foreground font-medium cursor-pointer">
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {job.type}
                    </Badge>
                    <span className="text-2xl font-bold text-primary">
                      ₦{job.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Due: {job.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {job.postedBy.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{job.postedBy}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{job.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{job.timePosted}</span>
                  </div>

                  <Button className="w-full mt-4 group-hover:bg-primary/90">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Browse;
