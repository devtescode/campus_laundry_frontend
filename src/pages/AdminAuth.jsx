import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
    const navigate = useNavigate();
    const [adminExists, setAdminExists] = useState(null);
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
    // console.log(data, "dataaaaaaaaaaa")

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

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) return alert(data.message);


        if (adminExists) {
            sessionStorage.setItem("admin", JSON.stringify(data));
            sessionStorage.setItem("adminToken", data.token);
            navigate("/admin");
        } else {
            alert("Admin created successfully. Please login.");
            setAdminExists(true);
            setForm({
                fullname: "",
                email: "",
                password: "",
            });
        }

    };

    if (adminExists === null) {
        return (
            <div className="h-screen flex items-center justify-center">
                Checking admin status...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg w-full max-w-sm shadow"
            >
                <h2 className="text-xl font-bold text-center mb-4">
                    {adminExists ? "Admin Login" : "Create Admin"}
                </h2>

                {/* FULL NAME ONLY FOR SIGNUP */}
                {!adminExists && (
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        className="w-full border p-2 mb-3 rounded"
                        value={form.fullname}
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading
                        ? "Please wait..."
                        : adminExists
                            ? "Login"
                            : "Create Admin"}
                </button>
            </form>
        </div>
    );
}
