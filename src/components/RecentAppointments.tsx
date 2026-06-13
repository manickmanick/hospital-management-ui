import type { Appointment } from "../models";

export default function RecentAppointments({
  appointments,
  loading = false,
}: {
  appointments: Appointment[];
  loading?: boolean;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-5 text-xl font-semibold">Recent appointments</h2>

      {loading ? (
        <p className="py-8 text-center text-slate-500">
          Loading appointments...
        </p>
      ) : appointments.length === 0 ? (
        <p className="py-8 text-center text-slate-500">
          No recent appointments.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-slate-900">
                    {item.patient}
                  </td>
                  <td>{item.doctor}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
