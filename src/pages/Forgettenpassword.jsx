import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URLS } from "../components/utils/apiConfig";

const Forgettenpassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address",
      });
    }

    try {
      setLoading(true);

      const res = await axios.post(API_URLS.forgotpassword, {
        email: email.trim().toLowerCase(),
      });

      Swal.fire({
        icon: "success",
        title: "Check Your Email 📩",
        text: res.data.message,
      });

      setEmail("");

    } catch (err) {
      console.log(err);

      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      // 👇 better handling for specific backend responses
      if (message.toLowerCase().includes("verify")) {
        Swal.fire({
          icon: "info",
          title: "Email Not Verified",
          text: message,
        });
      } else if (message.toLowerCase().includes("not found")) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <Card className="w-full max-w-md border-none shadow-md rounded-md overflow-hidden">
        <CardContent className="p-8">

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Forgot Password
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              Enter your registered email address to receive a password reset link.
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <Label htmlFor="email">Email Address</Label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            <Button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full h-12 rounded-xl"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forgettenpassword;