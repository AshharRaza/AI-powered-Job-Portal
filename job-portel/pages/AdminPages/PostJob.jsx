import React from "react";

export const PostJob = () => {

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)

      
            
            const FormDataBack = await fetch('http://localhost:3000/forminfo',{
                method:'POST',
                headers: {
                "Content-Type": "application/json"
                        } ,
                body:JSON.stringify(data),
                


            })

         
    }

  return (
   <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Software Engineer"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="company"
            
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. OpenAI"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Remote / New York"
            required
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Job Type</label>
          <select
            name="jobType"
           
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Salary Min */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Salary Min</label>
          <input
            type="number"
            name="salaryMin"
            
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 40000"
          />
        </div>

        {/* Salary Max */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Salary Max</label>
          <input
            type="number"
            name="salaryMax"
           
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 80000"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Job Description</label>
          <textarea
            name="description"
            
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Write the job description here..."
            required
          ></textarea>
        </div>

        {/* Requirements */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Requirements</label>
          <textarea
            name="requirements"
          
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="List the requirements here..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>

  );
}
