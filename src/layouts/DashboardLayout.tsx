import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
