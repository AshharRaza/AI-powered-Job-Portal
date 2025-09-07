import React from "react";

export const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          We are a modern job portal dedicated to connecting top talent with
          forward-thinking companies. Our platform leverages AI to help job
          seekers find the best opportunities and assist recruiters in hiring
          smarter.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
          <p className="text-gray-600 mt-3">
            To revolutionize recruitment by making hiring more efficient and
            inclusive, bridging the gap between job seekers and employers.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
          <p className="text-gray-600 mt-3">
            To become the most trusted global platform for career growth and
            recruitment powered by artificial intelligence.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-lg font-semibold">John Doe</h4>
            <p className="text-gray-600 text-sm">Founder & CEO</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-lg font-semibold">Sarah Smith</h4>
            <p className="text-gray-600 text-sm">CTO</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <img
              src="https://randomuser.me/api/portraits/men/76.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="text-lg font-semibold">Michael Brown</h4>
            <p className="text-gray-600 text-sm">Head of Operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
