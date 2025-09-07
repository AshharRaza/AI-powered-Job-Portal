import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ShortlistPage = () => {
  const [candidates, setCandidates] = useState([]);
  const params = useParams()

  console.log(params)

  const resumeData = async () => {
    try {
      const res = await fetch("http://localhost:3000/atsshortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      console.log(res)
      const data = await res.json();
      console.log(data.message)
      setCandidates(data.message)
    //   setStats(data); // assuming backend returns stats in same structure
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    resumeData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 w-full">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
        ✅ {params.status.toUpperCase()} CANDIDATES
      </h1>

      {/* Table */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white text-left">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">ATS Score</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr
                  key={candidate.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {candidate.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {candidate.email}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${candidate.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {candidate.score}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                     {candidate.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No shortlisted candidates yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
