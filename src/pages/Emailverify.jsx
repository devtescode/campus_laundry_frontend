import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Emailverify = () => {
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/userlaundry/verify-email?token=${token}`
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("success");

          // Redirect user to login after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {status === "verifying" && (
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          <h1 className="mt-4 text-2xl font-bold text-green-600">
            Email Verified!
          </h1>
          <p className="text-gray-600 mt-2">
            Redirecting you to the login page...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">
            Invalid or expired link try again
          </h1>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Emailverify;
