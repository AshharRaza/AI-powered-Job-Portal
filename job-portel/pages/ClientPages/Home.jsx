// src/pages/LandingPage.jsx
import React from "react";

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-12">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Explore thousands of opportunities from top companies.  
            Apply in just a few clicks and take your career to the next level.
          </p>

          {/* Search Bar */}
          <div className="mt-6 bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 text-center">
          <img
            src="./src/assets/image1.png"
            alt="Job Search"
            className="h-80"
            
          />
        </div>
      </section>

      {/* Featured Companies */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-8">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png" alt="Apple" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/LinkedIn_logo_initials.png" alt="LinkedIn" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Meta_logo.png" alt="Meta" className="h-8"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8"/>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-12">
          Explore Job Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { name: "Technology", jobs: "1200+" },
            { name: "Marketing", jobs: "800+" },
            { name: "Design", jobs: "650+" },
            { name: "Finance", jobs: "400+" },
          ].map((cat, i) => (
            <div key={i} className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-gray-800">{cat.name}</h4>
              <p className="text-gray-600">{cat.jobs} Jobs</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h3 className="text-3xl font-bold">Ready to land your dream job?</h3>
        <p className="mt-2 text-lg">Join thousands of candidates already hired through JobPortel.</p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Get Started
        </button>
      </section>

      
    </div>
  );
};


