import { useState } from "react";
import Navbar from "@/components/layout/Navbardb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Shirt,
  Clock,
  MapPin,
  DollarSign,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const laundryTypes = [
  { id: "washing", label: "Washing Only", icon: "🧺", description: "Just washing and drying" },
  { id: "ironing", label: "Ironing Only", icon: "👔", description: "Ironing and pressing" },
  { id: "washing-ironing", label: "Washing & Ironing", icon: "✨", description: "Complete wash and iron" },
  { id: "full-service", label: "Full Service", icon: "🌟", description: "Wash, dry, iron & fold" },
];

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    price: "",
    hostel: "",
    block: "",
    room: "",
    pickupDate: "",
    pickupTime: "",
    deliveryDate: "",
    deliveryTime: "",
    description: "",
    image: null
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("laundryUser"));
      

      const payload = {
        userId: user?.id,
        ...formData,
      };
      // console.log(payload.userId, "sdd");
      

      const res = await fetch("http://localhost:5000/userlaundry/createpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(res, "responsive");
      

      const data = await res.json();
      console.log(data, "data");
      
      if (res.ok) {
        toast({
          title: "Job Posted Successfully! 🎉",
          description: "Your laundry request is now visible to washers nearby.",
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Submission Failed",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to the server.",
        variant: "destructive",
      });
    }
  };


  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-16 h-1 mx-2 rounded transition-all ${step > s ? "bg-primary" : "bg-muted"
                    }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Laundry Type */}
          {step === 1 && (
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  What type of laundry service do you need?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  className="grid grid-cols-2 gap-4"
                >
                  {laundryTypes.map((type) => (
                    <Label
                      key={type.id}
                      htmlFor={type.id}
                      className={`flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all ${formData.type === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                        }`}
                    >
                      <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                      <span className="text-4xl mb-2">{type.icon}</span>
                      <span className="font-medium text-foreground">{type.label}</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        {type.description}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <Label htmlFor="quantity">Number of Items</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Your Budget (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 3000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  onClick={nextStep}
                  disabled={!formData.type || !formData.quantity || !formData.price}
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Where should the washer pick up?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hostel">Hostel / Hall</Label>
                  <Input
                    id="hostel"
                    placeholder="e.g., Jaja Hall"
                    value={formData.hostel}
                    onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="block">Block</Label>
                    <Input
                      id="block"
                      placeholder="e.g., Block A"
                      value={formData.block}
                      onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room">Room Number</Label>
                    <Input
                      id="room"
                      placeholder="e.g., 24"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!formData.hostel || !formData.block || !formData.room}
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Timing */}
          {step === 3 && (
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6 text-primary" />
                  When do you need it done?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Pickup Time</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupDate">Date</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pickupTime">Time</Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        value={formData.pickupTime}
                        onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Delivery Time</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryDate">Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime">Time</Label>
                      <Input
                        id="deliveryTime"
                        type="time"
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!formData.pickupDate || !formData.deliveryDate}
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Description & Image */}
          {step === 4 && (
            <Card className="bg-card border-border animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Add some details (optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Any special instructions? Delicate items? Specific detergent preferences?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <div>
                  <Label>Upload Photo (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-background rounded-xl p-4 border border-border">
                  <h3 className="font-medium text-foreground mb-3">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="text-foreground capitalize">{formData.type.replace("-", " & ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items</span>
                      <span className="text-foreground">{formData.quantity} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground">{formData.hostel}, {formData.block}, Room {formData.room}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Budget</span>
                      <span className="font-bold text-primary">₦{Number(formData.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={prevStep}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button className="flex-1" onClick={handleSubmit}>
                    Post Job <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

    </div>
  );
};

export default PostJob;
