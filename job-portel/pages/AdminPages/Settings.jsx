import { Home, Users, Briefcase, BarChart3, Settings, LogOut } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="px-6 py-6 text-2xl font-bold border-b border-gray-700">
        JobPortal Admin
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <Home size={20} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <Users size={20} /> Candidates
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <Briefcase size={20} /> Jobs
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <BarChart3 size={20} /> Analytics
        </a>
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <Settings size={20} /> Settings
        </a>
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <LogOut size={20} /> Logout
        </a>
      </div>
    </div>
  );
};


