import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import RecentAppointments from "../components/RecentAppointments";

function Dashboard() {
  return (
    <DashboardLayout>
      <Header />

      <div className="mt-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-slate-500 mt-2">Welcome back 👋</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <StatCard title="Patients" value="248" />

        <StatCard title="Doctors" value="32" />

        <StatCard title="Appointments" value="64" />

        <StatCard title="Revenue" value="$12,500" />
      </div>

      <RecentAppointments />
    </DashboardLayout>
  );
}

export default Dashboard;
