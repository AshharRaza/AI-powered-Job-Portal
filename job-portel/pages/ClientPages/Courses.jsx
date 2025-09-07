import { NavLink } from "react-router-dom";
import { Card } from "../ClientPages/Card";

export const Courses = () => {
  const courses = [
    { id: 1, title: "Frontend Development", description: "Learn HTML, CSS, JavaScript, React, and build modern UIs." },
    { id: 2, title: "Backend Development", description: "Master Node.js, Express, MongoDB, and build scalable APIs." },
    { id: 3, title: "AI & Machine Learning", description: "Understand ML concepts and integrate AI with your apps." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card 
            key={course.id}
            title={course.title}
            description={course.description}
          />
        ))}
      </div>

      {/* Prepare with AI Button */}
      <div className="flex justify-center mt-12">
        <NavLink to="/interview">
           <button className="flex items-center px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" 
            alt="AI Logo" 
            className="w-6 h-6 mr-2"
          />
          Prepare with AI
        </button>


        </NavLink>
       
      </div>
    </div>
  );
};




