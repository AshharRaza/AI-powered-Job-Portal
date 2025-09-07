import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminSignup = () => {
    const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    const signdata = Object.fromEntries(formData.entries())
    console.log(signdata)

    const res = await fetch("http://localhost:3000/adminsignup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signdata),
      credentials: "include"
    });
    const data = await res.json().message
    if(res.ok){
        alert(data)
        navigate("/adminlogin")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Sign Up</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
