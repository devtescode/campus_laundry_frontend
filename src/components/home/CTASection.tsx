import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl gradient-primary p-8 md:p-12 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-foreground/5 blur-2xl" />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Start Earning Today</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Turn Laundry Into Cash?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of students earning extra income on campus. It's free to sign up and easy to get started.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="xl" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
                >
                  Browse Jobs First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
