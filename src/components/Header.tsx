import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search patients, doctors..."
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="font-semibold">
              Admin User
            </p>

            <p className="text-xs text-slate-500">
              Hospital Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;