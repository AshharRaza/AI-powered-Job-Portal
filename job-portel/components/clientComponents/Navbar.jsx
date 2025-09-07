import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">JobPortel</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
        <NavLink to="/home">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            </NavLink>  
            <NavLink to="/clientjobs">
          <li className="hover:text-blue-600 cursor-pointer">Jobs</li>

            </NavLink>
            <NavLink to="/companies">
          <li className="hover:text-blue-600 cursor-pointer">Companies</li>

            </NavLink>
            <NavLink to='/about'>
          <li className="hover:text-blue-600 cursor-pointer">About</li>

            </NavLink>
              <NavLink to='/courses'>
          <li className="hover:text-blue-600 cursor-pointer">Prepare</li>

            </NavLink>
        </ul>
        <div>
          <NavLink to="/login">
            <button className="px-4 py-2 mr-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50">
            Login
          </button>
          </NavLink>
          <NavLink to="/signup" >
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign Up
          </button>


          </NavLink>
          
        </div>
      </div>
    </nav>
  );
};


