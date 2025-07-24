import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      formData.role === "user"
        ? "https://user-vendor-backend.onrender.com/user/signup"
        : "https://user-vendor-backend.onrender.com/vendor/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and role (if needed)
        localStorage.setItem("role", formData.role);

        // Redirect to role-based dashboard
        router.push(`/${formData.role}/dashboard`);
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-4"
            required
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-4"
            required
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-4"
            required
          />

          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mb-4">
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Signup
          </button>
        </form>

        {/* Login Link Section */}
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already a user?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-black-600 hover:underline font-semibold">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
