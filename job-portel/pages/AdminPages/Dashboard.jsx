import { Users, Briefcase, DollarSign, CheckCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { PostJob } from "./PostJob";




const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-6 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
      <Icon className={`w-8 h-8 ${color.replace("bg", "text")}`} />
    </div>
    <div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
);



export const Dashboard = () => {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  });
  const [dashboard,setDashboard] = useState()
  const [load,setLoad] = useState(true)
  

  const dashBoard = async() => {

    try {
      const res = await fetch("http://localhost:3000/dashboard",{
        method:'GET',
        credentials:'include'
      })
      console.log("res",res)
      const data = await res.json()
      if(!res.ok){
        alert(data.message)
         window.location.href = "/adminlogin";

        
      }
      
      console.log(data.message)
      setDashboard(data.message)
      setLoad(false)

    } catch (error) {
      console.log(error)
    }
    

    
      
   
  }
  useEffect(() => {
    dashBoard()
  },[])

  // const checkAuth = async() => {

  //   const res = await fetch("http://localhost:3000/dashboardAuth",{
  //     method:'GET',
  //     credentials:'include'
  //   })
  //   console.log(res)
  // }
  // useEffect(() => {

  //   checkAuth()

  // },[])

  return (
    <div className="p-6 space-y-8">
      {/* Top Heading */}
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} value={load ? 0 : `${dashboard.resume[0].count}`} label="Total Candidates" color="bg-blue-600" />
        <StatCard icon={Briefcase} value={load ? 0 : `${dashboard.jobsCount[0].count}`} label="Active Jobs" color="bg-green-600" />
        
        <StatCard icon={CheckCircle} value={load ? 0 : `${dashboard.user[0].count}`} label="Shortlisted" color="bg-purple-600" />
      </div>

      

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">📰 Recent Activity</h3>
        <ul className="space-y-4">
          <li className="flex justify-between items-center text-sm">
            <span className="text-gray-600">New candidate registered</span>
            <span className="text-gray-400">2 mins ago</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Job post approved: Frontend Developer</span>
            <span className="text-gray-400">10 mins ago</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-gray-600">5 candidates shortlisted for Data Scientist</span>
            <span className="text-gray-400">30 mins ago</span>
          </li>
        </ul>
      </div>

      {/* Post Job Section */}
      <PostJob/>
    </div>
  );
};


