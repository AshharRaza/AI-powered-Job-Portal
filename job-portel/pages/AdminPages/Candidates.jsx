import { useEffect } from "react";
import { useState } from "react";

 const candidatesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    jobTitle: "Frontend Developer",
    experience: "2 Years",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sneha Patel",
    email: "sneha@example.com",
    jobTitle: "Backend Developer",
    experience: "3 Years",
    status: "Shortlisted",
  },
  {
    id: 3,
    name: "Aman Verma",
    email: "aman@example.com",
    jobTitle: "UI/UX Designer",
    experience: "1 Year",
    status: "Interview",
  },
];

export const Candidates = () =>  {
  const [search, setSearch] = useState("");

  const filteredCandidates = candidatesData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.jobTitle.toLowerCase().includes(search.toLowerCase())
  );

  const checkCandidateAuth = async() => {

    const res = await fetch("http://localhost:3000/checkcandiatesauth",{
      method:'GET',
      credentials:'include'
    })
    console.log(res)
    const data = await res.json()
    if(!res.ok){
      alert(data.message)
      window.location.href = "/adminlogin"
    }

  }
  useEffect(() => {

    checkCandidateAuth()

  },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Candidates</h1>

      {/* Search */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
          + Add Candidate
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100 text-gray-700 text-sm">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Applied For</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{candidate.name}</td>
                <td className="p-4">{candidate.email}</td>
                <td className="p-4">{candidate.jobTitle}</td>
                <td className="p-4">{candidate.experience}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      candidate.status === "Shortlisted"
                        ? "bg-green-100 text-green-600"
                        : candidate.status === "Interview"
                        ? "bg-yellow-100 text-yellow-600"
                        : candidate.status === "Hired"
                        ? "bg-blue-100 text-blue-600"
                        : candidate.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                    View
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                    Shortlist
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
