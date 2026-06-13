import { Bell, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="relative hidden w-96 md:block">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search patients, doctors..."
          className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative" aria-label="Notifications">
          <Bell size={22} />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 font-bold text-blue-700">
            {user?.name?.charAt(0).toUpperCase() ?? "A"}
          </span>
          <div className="hidden sm:block">
            <p className="font-semibold text-slate-900">
              {user?.name ?? "Admin User"}
            </p>
            <p className="text-xs capitalize text-slate-500">
              {user?.role ?? "Hospital Admin"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="icon-button text-slate-500 hover:text-red-600"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
