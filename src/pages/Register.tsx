import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", form);
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 flex items-center justify-center relative overflow-hidden px-4">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1950&q=80')",
                }}
            />

            {/* Content */}
            <div className="relative z-10 bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
                <div className="text-center mb-6">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        alt="Company Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full object-cover shadow"
                    />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">PT Rafli Zocky</h1>
                    <p className="text-gray-500 text-xs sm:text-sm">Helpdesk Ticketing System</p>
                </div>

                {error && <p className="text-red-500 text-xs sm:text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="border border-gray-300 p-3 w-full rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        className="border border-gray-300 p-3 w-full rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                        type="password"
                        className="border border-gray-300 p-3 w-full rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <select
                        className="border border-gray-300 p-3 w-full rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 w-full rounded font-medium text-sm sm:text-base transition-colors duration-200">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;