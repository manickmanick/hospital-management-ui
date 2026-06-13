import { Pencil, Trash2 } from "lucide-react";

function PatientTable() {
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
      phone: "9876543210",
    },
    {
      id: 2,
      name: "Sarah",
      age: 32,
      phone: "9999999999",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 mt-8">
      <div className="p-5 border-b">
        <input
          type="text"
          placeholder="Search patient..."
          className="w-full md:w-80 border border-slate-300 rounded-xl px-4 py-2"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="text-left p-4">Name</th>

            <th className="text-left p-4">Age</th>

            <th className="text-left p-4">Phone</th>

            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b hover:bg-slate-50">
              <td className="p-4">{patient.name}</td>

              <td className="p-4">{patient.age}</td>

              <td className="p-4">{patient.phone}</td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button className="text-blue-600">
                    <Pencil size={18} />
                  </button>

                  <button className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
