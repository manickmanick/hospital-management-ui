import type { DashboardSummary } from "../models";
import { getAppointments } from "./appointment.service";
import { getDoctors } from "./doctor.service";
import { getPatients } from "./patient.service";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [patients, doctors, appointments] = await Promise.all([
    getPatients(),
    getDoctors(),
    getAppointments().catch(() => []),
  ]);

  return {
    patients: patients.length,
    doctors: doctors.length,
    appointments: appointments.length,
    completedAppointments: appointments.filter(
      (appointment) => appointment.status === "COMPLETED",
    ).length,
    recentAppointments: appointments.slice(0, 5),
  };
}
