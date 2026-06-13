import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/auth-context";
import AddAppointmentModal from "../components/AddAppointmentModal";
import Header from "../components/Header";
import PrescriptionModal from "../components/PrescriptionModal";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Appointment, AppointmentStatus } from "../models";
import { getApiErrorMessage } from "../services/api";
// import { deleteAppointment, getAppointments, updateAppointmentStatus } from "../services/appointment.service";

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [prescriptionAppointment, setPrescriptionAppointment] = useState<Appointment | null>(null);

  const loadAppointments = useCallback(async () => {
    try {
    //   setLoading(true);
    //   setAppointments(await getAppointments());
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load appointments"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // getAppointments()
    //   .then(setAppointments)
    //   .catch((error) =>
    //     toast.error(getApiErrorMessage(error, "Unable to load appointments")),
    //   )
    //   .finally(() => setLoading(false));
  }, []);

  const changeStatus = async (id: number, status: AppointmentStatus) => {
    try {
    //   await updateAppointmentStatus(id, status);
    //   await loadAppointments();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to update appointment"));
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
    //   await deleteAppointment(id);
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
        <div><h1>Appointments</h1><p>Schedule visits and track appointment status.</p></div>
        <button className="primary-button" onClick={() => setOpen(true)}><Plus size={18} /> New appointment</button>
      </div>
      {loading ? <div className="empty-card">Loading appointments...</div> : !appointments.length ? <div className="empty-card">No appointments found.</div> : (
        <div className="table-card"><div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date and time</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
            <tbody>{appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="font-semibold text-slate-900">{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                <td>
                  <select value={appointment.status} onChange={(event) => void changeStatus(appointment.id, event.target.value as AppointmentStatus)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm">
                    <option value="SCHEDULED">Scheduled</option><option value="COMPLETED">Completed</option><option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
                <td className="text-right">
                  {user?.role === "DOCTOR" && appointment.status === "COMPLETED" && (
                    <button className="mr-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700" onClick={() => setPrescriptionAppointment(appointment)}>Prescribe</button>
                  )}
                  {user?.role === "ADMIN" && <button className="icon-button text-red-600" onClick={() => void remove(appointment.id)}><Trash2 size={18} /></button>}
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div></div>
      )}
      <AddAppointmentModal open={open} onClose={() => setOpen(false)} onSuccess={loadAppointments} />
      <PrescriptionModal appointment={prescriptionAppointment} onClose={() => setPrescriptionAppointment(null)} />
    </DashboardLayout>
  );
}
