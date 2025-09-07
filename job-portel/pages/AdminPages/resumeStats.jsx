import { useEffect, useState } from "react";
import { data, NavLink, useParams } from "react-router-dom";
import {
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react"; // install lucide-react for icons

export const ResumeDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    unshortlisted: 0,
    shortlistedNames: [],
  });
  const [setData,setBackData]  = useState()
  const [candidates,setCandidate] = useState()
  const [count,setCount] = useState()
  const [load,setLoad] = useState(true)

  const params = useParams();
  console.log(params)
  let sum = 0
  const resumeData = async () => {
      try {
        const res = await fetch("http://localhost:3000/resumeStats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        });
        console.log(res)
        const data = await res.json();
        console.log(data.message)
        setBackData(data.message.result)
        setCandidate(data.message.total)
        

        
        
         // assuming backend returns stats in same structure
      } catch (err) {
        console.error(err);
      }finally{
        setLoad(false)
     
      }
    };
  
    useEffect(() => {
      resumeData();
    }, []);
    
    console.log(setData)

    const CheckAuthResumeStats = async() => {

      const res = await fetch("http://localhost:3000/resumeStatsAuth",{
        method:'GET',
        credentials:'include'
      })
      const data = await res.json()
      if(!res.ok){
        alert(data.message)
        window.location.href = "/adminlogin"
      }

    }
    useEffect(() => {

      CheckAuthResumeStats()

    },[])
    
  


  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 w-full">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 ATS Resume Dashboard
        </h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          Export Report
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10 px-6">
        
        <NavLink to={`/${params.jobId}/resumestats/all`}>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
          <Users className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-sm text-gray-500">Total Resumes</h2>
            <p className="text-3xl font-bold text-gray-800"> {load ? <h1>Load</h1> : count}</p>
          </div>
        </div>


        </NavLink>
        
<NavLink to={`/${params.jobId}/resumestats/shortlisted`}>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
          <div>
            <h2 className="text-sm text-gray-500">Shortlisted</h2>
            <p className="text-3xl font-bold text-green-600">
               {load ? <h1>Load</h1> : setData[1].count}
            </p>
          </div>
        </div>
        </NavLink>

<NavLink to={`/${params.jobId}/resumestats/notshortlisted`}>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex items-center gap-4">
          <XCircle className="w-10 h-10 text-red-600" />
          <div>
            <h2 className="text-sm text-gray-500">Unshortlisted</h2>
            <p className="text-3xl font-bold text-red-600">
               {load ? <h1>Load</h1> : setData[2].count}
            </p>
          </div>
        </div>
        </NavLink>
      </div>

      {/* Shortlisted Candidates */}
      <div className="max-w-5xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          ✅Total Shortlisted Candidates
        </h2>

        {load ? <h1>Load</h1> : candidates.length > 0 ? (
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {load ? <h1>Load</h1> : candidates.map((name, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {name.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                      {name.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No shortlisted candidates yet.</p>
        )}
      </div>
    </div>
  );
};
