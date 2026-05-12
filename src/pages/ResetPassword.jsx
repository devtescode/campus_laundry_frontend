import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import Swal from "sweetalert2";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-2xl border">
        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleReset}
          className="w-full bg-black text-white rounded-xl py-3 mt-4"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;   