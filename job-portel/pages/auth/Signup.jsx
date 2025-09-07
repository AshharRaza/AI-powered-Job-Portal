import { useState } from "react";

export const Signup = () => {
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = new FormData(e.target)
    const formData = Object.fromEntries(Data.entries())
    console.log(formData)
    

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // API call to backend signup
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
        
          className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          
          className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
        
          className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          
          className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
