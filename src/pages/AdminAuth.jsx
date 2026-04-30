import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminAuth() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [adminExists, setAdminExists] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/admin/exists")
            .then(res => res.json())
            .then(data => setAdminExists(data.adminExists))
            .catch(() => setAdminExists(true));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = adminExists
            ? "http://localhost:5000/admin/login"
            : "http://localhost:5000/admin/signup";

        const body = adminExists
            ? { email: form.email, password: form.password }
            : form;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                toast({
                    title: "Authentication Failed",
                    description: data.message || "Please check your credentials",
                    variant: "destructive"
                });
                return;
            }

            if (adminExists) {
                sessionStorage.setItem("admin", JSON.stringify(data));
                sessionStorage.setItem("adminToken", data.token);
                toast({
                    title: "Welcome back! 🎉",
                    description: "Admin login successful",
                });
                navigate("/admin");
            } else {
                toast({
                    title: "Admin Created Successfully ✅",
                    description: "Please log in with your credentials",
                });
                setAdminExists(true);
                setForm({
                    fullname: "",
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            setLoading(false);
            toast({
                title: "Network Error",
                description: "Unable to connect to server",
                variant: "destructive"
            });
        }
    };

    if (adminExists === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-sm bg-slate-800/50 border-slate-700">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin mb-4">
                            <Loader2 className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-slate-300">Checking admin status...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back to Home Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white mb-2 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to home</span>
                </Link>

                <Card className="bg-slate-800/80 border-slate-700 shadow-2xl backdrop-blur">
                    <CardHeader className="text-center space-y-4">
                        {/* Admin Icon */}
                        <div className="flex justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <div>
                            <CardTitle className="text-3xl text-white">
                                {adminExists ? "Admin Login" : "Setup Admin"}
                            </CardTitle>
                            <CardDescription className="text-slate-400 text-base mt-2">
                                {adminExists
                                    ? "Sign in to access the admin dashboard"
                                    : "Create your admin account to get started"}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name - Only for Signup */}
                            {!adminExists && (
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="text-slate-300 font-medium">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none group-focus-within:text-blue-400 transition-colors" />
                                        <Input
                                            id="fullname"
                                            type="text"
                                            name="fullname"
                                            placeholder="Enter your full name"
                                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                                            value={form.fullname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300 font-medium">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="admin@example.com"
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none group-focus-within:text-blue-400 transition-colors" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder={adminExists ? "Enter your password" : "Create a strong password"}
                                        className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : adminExists ? (
                                    "Sign In as Admin"
                                ) : (
                                    "Create Admin Account"
                                )}
                            </Button>
                        </form>

                        {/* Toggle between Login and Signup */}
                        {/* {adminExists && (
                            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                                <p className="text-slate-400 text-sm">
                                    First time here?{" "}
                                    <button
                                        onClick={() => {
                                            setAdminExists(false);
                                            setForm({ fullname: "", email: "", password: "" });
                                        }}
                                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                    >
                                        Create an account
                                    </button>
                                </p>
                            </div>
                        )} */}
                    </CardContent>
                </Card>

                {/* Security Info */}
                <div className="mt-2 text-center text-slate-500 text-sm">
                    <p>🔒 Your login is secure and encrypted</p>
                </div>
            </div>
        </div>
    );
}
