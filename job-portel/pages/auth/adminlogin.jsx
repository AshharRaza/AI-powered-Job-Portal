import { useState } from "react";

export const AdminLogin = () => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const signdata = Object.fromEntries(formData.entries())
    console.log(signdata)

    const res = await fetch("http://localhost:3000/adminlogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signdata),
      credentials: "include", // 👈 important for cookies
    });

    console.log(res)
    const data = await res.json();
    console.log(data);

    if (data.message) {
      alert("✅ Admin Logged in Successfully");
      // redirect to dashboard
      window.location.href = "/";
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
         
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};
