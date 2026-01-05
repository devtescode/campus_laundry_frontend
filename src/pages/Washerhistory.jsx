import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CheckCircle } from "lucide-react";

const Washerhistory = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const washer = JSON.parse(localStorage.getItem("laundryUser"));
        if (!washer?.id) return;

        const res = await fetch(
          `http://localhost:5000/userlaundry/getWasherHistory/${washer.id}`
        );

        const data = await res.json();
        console.log("Washer history:", data);

        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  const formatMoney = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);

  const totalEarnings = jobs.reduce(
  (sum, job) => sum + Number(job.price || 0),
  0
);


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">

          {/* HEADER */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Washer <span className="text-primary">History</span>
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              A complete record of all laundry jobs you’ve successfully completed.
            </p>
          </div>

          {/* EARNINGS SUMMARY */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="md:col-span-2 bg-card/80 backdrop-blur border border-border rounded-2xl p-8 shadow-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Total Earnings
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
                {formatMoney(totalEarnings)}
              </h2>
              <p className="text-xs text-muted-foreground mt-2">
                From {jobs.length} completed jobs
              </p>
            </div>

            <div className="bg-card/80 backdrop-blur border border-border rounded-2xl p-8 shadow-lg flex flex-col justify-center">
              <p className="text-sm text-muted-foreground mb-2">
                Performance Status
              </p>
              <Badge className="w-fit bg-green-500/20 text-green-600 border-green-500/30 px-4 py-2 text-sm">
                Excellent Standing
              </Badge>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <p className="text-center text-muted-foreground">
              Fetching your history…
            </p>
          )}

          {/* EMPTY STATE */}
          {!loading && jobs.length === 0 && (
            <div className="text-center mt-20">
              <p className="text-muted-foreground text-lg">
                You haven’t completed any jobs yet.
              </p>
            </div>
          )}

          {/* HISTORY CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <Card
                key={job._id}
                className="group relative overflow-hidden bg-card/90 backdrop-blur border border-border rounded-2xl shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <CardContent className="p-6">

                  {/* TOP STRIP */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-500" />

                  {/* STATUS & PRICE */}
                  <div className="flex justify-between items-center mb-5">
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                      ✓ Completed
                    </Badge>
                    <span className="text-xl font-bold text-primary">
                      {formatMoney(job.price)}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* DETAILS */}
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>
                        {job.hostel} {job.block}, Room {job.room}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>
                        {new Date(job.updatedAt).toLocaleDateString("en-NG", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* CUSTOMER */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                      {job.userId?.fullname?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {job.userId?.fullname || "Unknown User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Customer
                      </p>
                    </div>
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

export default Washerhistory;
