import { Eye, Trash2 } from "lucide-react";
import type { Patient } from "../models";
import { Link } from "react-router-dom";

type Props = {
  patients: Patient[];
  loading: boolean;
  onDelete: (id: number) => void;
  canDelete: boolean;
  canViewHistory: boolean;
};

function PatientTable({ patients, loading, onDelete, canDelete, canViewHistory }: Props) {
  if (loading) {
    return (
      <div className="bg-white mt-8 rounded-2xl p-8">Loading patients...</div>
    );
  }
  if (patients.length === 0) {
    return (
      <div className="bg-white mt-8 rounded-2xl p-10 text-center">
        <h3 className="text-xl font-semibold">No Patients Found</h3>

        <p className="text-slate-500 mt-2">Add your first patient.</p>
      </div>
    );
  }
  return (
    <div className="table-card">
      <div className="p-5 border-b">
        <input
          type="text"
          placeholder="Search patient..."
          className="w-full md:w-80 border border-slate-300 rounded-xl px-4 py-2"
        />
      </div>

      <div className="overflow-x-auto">
      <table className="w-full min-w-[620px]">
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
                  {canViewHistory && (
                    <Link className="icon-button text-blue-600" to={`/patients/${patient.id}`}>
                      <Eye size={18} />
                    </Link>
                  )}
                  {canDelete && (
                    <button className="icon-button text-red-600" onClick={() => onDelete(patient.id)}>
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default PatientTable;
