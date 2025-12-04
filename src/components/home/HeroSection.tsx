import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt, Sparkles, DollarSign } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-primary/30 animate-bubble" />
        <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-accent/30 animate-bubble" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full bg-primary/20 animate-bubble" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Student Laundry Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              Turn Laundry Into
              <span className="text-gradient block">Extra Cash</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Connect with fellow students to get your laundry done or earn money doing laundry for others. Simple, safe, and student-friendly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/browse">
                <Button variant="hero" size="xl">
                  Find Laundry Jobs
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/post-job">
                <Button variant="hero-outline" size="xl">
                  Post Your Laundry
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">2,000+</div>
                <div className="text-sm text-muted-foreground">Jobs Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">₦50k+</div>
                <div className="text-sm text-muted-foreground">Earned Weekly</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Card */}
              <div className="bg-card rounded-3xl shadow-xl p-6 border border-border animate-scale-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">New Laundry Job</h3>
                    <p className="text-sm text-muted-foreground">Posted 2 min ago</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground font-medium">Wash & Iron</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="text-foreground font-medium">15 items</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground font-medium">Block A, Room 204</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-success font-bold text-lg">
                    <DollarSign className="w-5 h-5" />
                    <span>₦2,500</span>
                  </div>
                  <Button size="sm">Accept Job</Button>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-lg p-4 border border-border animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-success text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Job Completed!</div>
                    <div className="text-xs text-muted-foreground">+₦1,800 earned</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-lg p-4 border border-border animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card" />
                    <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-card" />
                    <div className="w-8 h-8 rounded-full bg-success/20 border-2 border-card" />
                  </div>
                  <div className="text-sm text-muted-foreground">+12 students online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
