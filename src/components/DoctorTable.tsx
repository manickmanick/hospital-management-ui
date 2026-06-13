import { Trash2 } from "lucide-react";
import type { Doctor } from "../models";

type Props = {
  doctors: Doctor[];
  loading: boolean;
  onDelete: (id: number) => void;
};

export default function DoctorTable({ doctors, loading, onDelete }: Props) {
  if (loading) return <div className="empty-card">Loading doctors...</div>;

  if (!doctors.length) {
    return (
      <div className="empty-card">
        <h3 className="text-lg font-semibold text-slate-900">
          No doctors found
        </h3>
        <p className="mt-1 text-slate-500">Add your first doctor.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="font-semibold text-slate-900">{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>
                  <span
                    className={
                      doctor.status === "Unavailable"
                        ? "status-badge bg-slate-100 text-slate-600"
                        : "status-badge bg-emerald-100 text-emerald-700"
                    }
                  >
                    {doctor.status ?? "Available"}
                  </span>
                </td>
                <td className="text-right">
                  <button
                    className="icon-button text-red-600"
                    onClick={() => onDelete(doctor.id)}
                    aria-label={`Delete ${doctor.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
