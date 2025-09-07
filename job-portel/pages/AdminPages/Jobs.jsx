import React, { useState, useEffect } from "react";
import { JobListbackend } from "../../Api-fetch/apiDatas";
import { NavLink } from "react-router-dom";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [load,setLoad] = useState(true)

  const JobList = async() => {

    const uploadedjobs = await JobListbackend() 
    setJobs(uploadedjobs)
    setLoad(false)
   
  }
  useEffect(() => {
    JobList()
  },[])
  
 
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      

        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border"
          >
            {/* Job Title */}
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>

            {/* Job Meta Info */}
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                {job.location}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                {job.jobType}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                ₹{job.salaryMin} - ₹{job.salaryMax}
              </span>
            </div>

            {/* Job Description */}
            <p className="mt-4 text-gray-700 text-sm line-clamp-3">
              {job.description}
            </p>

            {/* Requirements */}
            <p className="mt-2 text-gray-500 text-xs">
              <strong>Requirements:</strong> {job.requirements}
            </p>

            {/* Apply Button */}
            <div className="mt-6">
              <NavLink to={`/${job.id}/resumestats`}>
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Check Status
              </button>


              </NavLink>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

