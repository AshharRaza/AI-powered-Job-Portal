import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export const Login = () => {
 
  const navigate = useNavigate()
  const [login,setLogin] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Objectdata = new FormData(e.target)
    const formData = Object.fromEntries(Objectdata.entries())

    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
       credentials:"include"
    });

    setLogin(res.ok)
    const data = await res.json();

    if (data.token) {
      
      alert("Something Went Wrong");
      
      // redirect to dashboard
    } else {
      alert(data.message);
      navigate("/clientjobs",{state: {login}})
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
         
          className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
