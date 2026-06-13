function RecentAppointments() {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Smith",
      date: "12 Jun 2026",
      status: "Scheduled"
    },
    {
      id: 2,
      patient: "Sarah",
      doctor: "Dr. Wilson",
      date: "12 Jun 2026",
      status: "Completed"
    },
    {
      id: 3,
      patient: "Michael",
      doctor: "Dr. James",
      date: "13 Jun 2026",
      status: "Scheduled"
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 mt-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">
          Recent Appointments
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3">Patient</th>
            <th className="pb-3">Doctor</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(item => (
            <tr
              key={item.id}
              className="border-b"
            >
              <td className="py-4">
                {item.patient}
              </td>

              <td>{item.doctor}</td>

              <td>{item.date}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status ===
                    "Completed"
                      ? "bg-green-100 text-green-700"
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
  );
}

export default RecentAppointments;