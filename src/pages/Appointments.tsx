import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddAppointmentModal from "../components/AddAppointmentModal";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Appointment, AppointmentStatus } from "../models";
import { getApiErrorMessage } from "../services/api";
import {
  deleteAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../services/appointment.service";

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setAppointments(await getAppointments());
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load appointments"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAppointments()
      .then(setAppointments)
      .catch((error) => {
        toast.error(getApiErrorMessage(error, "Unable to load appointments"));
      })
      .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id: number, status: AppointmentStatus) => {
    try {
      await updateAppointmentStatus(id, status);
      await loadAppointments();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to update appointment"));
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await deleteAppointment(id);
      toast.success("Appointment deleted");
      await loadAppointments();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to delete appointment"));
    }
  };

  return (
    <DashboardLayout>
      <Header />
      <div className="page-heading">
        <div>
          <h1>Appointments</h1>
          <p>Schedule visits and track appointment status.</p>
        </div>
        <button className="primary-button" onClick={() => setOpen(true)}>
          <Plus size={18} /> New appointment
        </button>
      </div>

      {loading ? (
        <div className="empty-card">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="empty-card">No appointments found.</div>
      ) : (
        <div className="table-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="font-semibold text-slate-900">
                      {appointment.patient}
                    </td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time ?? "-"}</td>
                    <td>
                      <select
                        value={appointment.status}
                        onChange={(event) =>
                          void changeStatus(
                            appointment.id,
                            event.target.value as AppointmentStatus,
                          )
                        }
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      >
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        className="icon-button text-red-600"
                        onClick={() => void remove(appointment.id)}
                        aria-label="Delete appointment"
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
      )}

      <AddAppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadAppointments}
      />
    </DashboardLayout>
  );
}
