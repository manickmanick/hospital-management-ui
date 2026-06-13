import { LayoutDashboard, Users, UserRound, CalendarDays } from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "Patients",
      icon: Users,
      path: "/patients",
    },
    {
      title: "Doctors",
      icon: UserRound,
      path: "/doctors",
    },
    {
      title: "Appointments",
      icon: CalendarDays,
      path: "/appointments",
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">HospitalMS</h1>

        <p className="text-sm text-slate-500 mt-1">Management Portal</p>
      </div>

      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
