import { Search, MessageSquare, Sparkles, Wallet } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse or Post",
    description: "Find laundry jobs near you or post your own laundry request with details and pricing.",
    color: "primary",
  },
  {
    icon: MessageSquare,
    title: "Connect & Chat",
    description: "Message directly with students to discuss details, pickup times, and special requirements.",
    color: "accent",
  },
  {
    icon: Sparkles,
    title: "Get It Done",
    description: "Complete the laundry service with care. Quality work means better ratings and more jobs.",
    color: "success",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    description: "Receive payment securely after the job is completed. Track your earnings in your dashboard.",
    color: "warning",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Whether you want to earn or get your laundry done, we've made it simple.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-1">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-secondary text-muted-foreground text-sm font-bold flex items-center justify-center border-2 border-background">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  step.color === 'primary' ? 'bg-primary-light text-primary' :
                  step.color === 'accent' ? 'bg-accent/10 text-accent' :
                  step.color === 'success' ? 'bg-success/10 text-success' :
                  'bg-warning/10 text-warning'
                }`}>
                  <step.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
