import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { JobListbackend } from "../../Api-fetch/apiDatas";



export const JobsPage = () => {
  const [search, setSearch] = useState("");
  const [jobs,setJobs] = useState()
  const [load,setLoad] = useState(true)
  const [filteredJobs,setFilteredJobs] = useState()

  

  const AvailabelJobs = async() => {

    try {
        const availableJobs = await JobListbackend()
        setJobs(availableJobs)
        
    } catch (error) {
        console.log(error)
    }
    finally{
        setLoad(false)
    
 
    }
  }
  useEffect(() => {
    

    AvailabelJobs()
  },[])
  
 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <aside className="col-span-3 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Filters
          </h2>
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-600">Job Type</label>
              <select className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400">
                <option>All</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
            <div>
              <label className="font-medium text-gray-600">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="font-medium text-gray-600">Salary Range</label>
              <input
                type="text"
                placeholder="e.g. ₹10,00,000+"
                className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </aside>

        {/* Jobs Listing */}
        <section className="col-span-9 space-y-6">

        {
            load ? <h1>Loading...</h1>: (
                <>
                {jobs.map((job) => {

                    return(
                        <>
                        <div
                key={job.id}
                className="bg-white shadow hover:shadow-lg transition rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">
                    {job.company} • {job.location}
                  </p>
                  <p className="text-gray-700 mt-1">{job.salary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                   {job.requirements}
                    
                  </div>
                </div>
         <NavLink to={`/clientjobs/${job.id}`}>

            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                  Apply Now
                </button>
            
            </NavLink>       
              </div>
                        </>
                    )
                })}
                </>
            )
            
         
        
        
        }

          

          {/* Pagination */}
          <div className="flex justify-center space-x-2 mt-6">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Prev
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
              1
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              2
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
