import { Shield, Clock, Star, Users, Smartphone, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Students",
    description: "Only verified university students can join. Your safety is our priority.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Work on your own time. Accept jobs that fit your class schedule.",
  },
  {
    icon: Star,
    title: "Rating System",
    description: "Build trust with ratings and reviews. Quality service gets rewarded.",
  },
  {
    icon: Users,
    title: "Campus Community",
    description: "Connect with students in your hostel or building for convenient pickups.",
  },
  {
    icon: Smartphone,
    title: "Real-time Chat",
    description: "Message instantly with students about job details and updates.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Get paid safely through our platform. No cash hassle.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Students Love Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for campus life. We understand your needs and made it work for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
