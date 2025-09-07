import { Home, Users, Briefcase, BarChart3, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-200 text-blue-600 flex flex-col shadow-lg">
      <div className="px-6 py-6 text-2xl font-bold border-b border-gray-700">
        JobPortal Admin
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <NavLink to="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
          <Home size={20} /> Dashboard
        </NavLink>
        <NavLink to="/candidates" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
          <Users size={20} /> Candidates
        </NavLink>
        <NavLink to="/jobs" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
          <Briefcase size={20} /> Jobs
        </NavLink>
        
        <NavLink href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">

        <NavLink href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
            Login In
        </NavLink>
        <NavLink  href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
           SignUp
        </NavLink >
        {/* <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-300">
          <LogOut size={20} /> Logout
        </a> */}
      </div>
    </div>
  );
};


