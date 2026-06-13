import { CalendarDays, FlaskConical, LayoutDashboard, ShieldCheck, UserRound, Users } from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/auth-context";

function Sidebar() {
  const { user } = useAuth();
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
      roles: ["ADMIN", "DOCTOR"],
    },
    {
      title: "Accounts",
      icon: ShieldCheck,
      path: "/users",
      roles: ["ADMIN"],
    },
    {
      title: "Lab reports",
      icon: FlaskConical,
      path: "/lab-reports",
      roles: ["ADMIN", "LAB"],
    },
  ].filter((item) => !item.roles || (user && item.roles.includes(user.role)));

  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="px-5 py-4 lg:p-6">
        <h1 className="text-2xl font-bold text-blue-600">HospitalMS</h1>

        <p className="text-sm text-slate-500 mt-1">Management Portal</p>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:pb-0">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 transition-all lg:mb-2 ${
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
