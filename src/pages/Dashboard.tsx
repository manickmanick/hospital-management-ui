import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header";
import RecentAppointments from "../components/RecentAppointments";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layouts/DashboardLayout";
import type { DashboardSummary } from "../models";
import { getApiErrorMessage } from "../services/api";
import { getDashboardSummary } from "../services/dashboard.service";

const emptySummary: DashboardSummary = {
  patients: 0,
  doctors: 0,
  appointments: 0,
  revenue: 0,
  recentAppointments: [],
};

export default function Dashboard() {
  const [summary, setSummary] = useState(emptySummary);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then(setSummary)
      .catch((error) => {
        toast.error(getApiErrorMessage(error, "Unable to load dashboard"));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <Header />

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Here is today&apos;s hospital overview.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Patients"
          value={loading ? "..." : summary.patients.toLocaleString()}
        />
        <StatCard
          title="Doctors"
          value={loading ? "..." : summary.doctors.toLocaleString()}
        />
        <StatCard
          title="Appointments"
          value={loading ? "..." : summary.appointments.toLocaleString()}
        />
        <StatCard
          title="Revenue"
          value={
            loading
              ? "..."
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(summary.revenue)
          }
        />
      </div>

      <RecentAppointments
        appointments={summary.recentAppointments}
        loading={loading}
      />
    </DashboardLayout>
  );
}
