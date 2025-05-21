import { ChartNoAxesColumn, Crown, SquareLibrary, User } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-4 sticky top-0 h-screen overflow-hidden">
        <div className="space-y-4">
          {/* Dashboard Link */}
          <Link to="dashboard" className="flex items-center gap-4 mt-4">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          {/* Courses Link */}
          <Link to="course" className="flex items-center gap-4">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          <Link to="students" className="flex items-center gap-4">
            <User size={22} />
            <h1>Students</h1>
          </Link>
          <Link to="premium" className="flex items-center gap-4">
            <Crown size={24} className="text-blue-500" />
            <span>Upgrade to Premium</span>
          </Link>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 p-4 md:p-20">
        <Outlet /> {/* Child routes render here */}
      </div>
    </div>
  );
};

export default Sidebar;
