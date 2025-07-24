import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
        ? "https://user-vendor-backend.onrender.com/user/login"
        : "https://user-vendor-backend.onrender.com/vendor/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        if (text.toLowerCase().includes("user not found")) {
          alert("User not found!");
        } else if (text.toLowerCase().includes("invalid credentials")) {
          alert("Invalid credentials!");
        } else {
          alert("Login failed!");
        }

        return;
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", formData.role);
        router.push(`/${formData.role}/dashboard`);
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-coral-500 via-peach-500 to-pink-500">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

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
            Login
          </button>
        </form>

        {/* Signup Link Section */}
        <div className="text-center mt-4">
          <p className="text-gray-700">
            New user?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="text-blue-600 hover:underline font-semibold">
              Signup!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
