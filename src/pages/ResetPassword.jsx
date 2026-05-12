import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Passwords do not match",
      });
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/userlaundry/resetpassword/${token}`,
        { password }
      );

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: res.data.message,
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Invalid token",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <div className="w-full max-w-md p-6 rounded-md bg-card shadow-md">

        <h1 className="text-3xl font-bold mb-2 text-center text-foreground">
          Reset Password
        </h1>

        <p className="text-sm text-muted-foreground text-center mb-6">
          Create your new password below
        </p>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-2xl px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-primary/20"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-border rounded-2xl px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-primary/20"
          />

          <button
            onClick={handleReset}
            disabled={!password || !confirmPassword || loading}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-3 font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;