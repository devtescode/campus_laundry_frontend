import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chioma A.",
    role: "200 Level, UNILAG",
    content: "I make ₦15,000 weekly just doing laundry in my hostel. It's the perfect side hustle between classes!",
    rating: 5,
    type: "washer",
  },
  {
    name: "Emeka O.",
    role: "300 Level, OAU",
    content: "As someone with a busy engineering schedule, finding someone to handle my laundry has been a lifesaver. Fast and reliable!",
    rating: 5,
    type: "poster",
  },
  {
    name: "Adaeze N.",
    role: "400 Level, UNIBEN",
    content: "The rating system helps me find trustworthy students. My clothes always come back clean and well-ironed.",
    rating: 5,
    type: "poster",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of students already using LaundryHub on campus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/10" />
                <p className="text-foreground leading-relaxed pl-4">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
                <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                  testimonial.type === 'washer' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-primary-light text-primary'
                }`}>
                  {testimonial.type === 'washer' ? 'Washer' : 'User'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
