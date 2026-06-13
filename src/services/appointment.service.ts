import type {
  Appointment,
  AppointmentInput,
  AppointmentStatus,
} from "../models";
import { api } from "./api";

export async function getAppointments() {
  const response = await api.get<Appointment[]>("/appointments");
  return response.data;
}

export async function createAppointment(appointment: AppointmentInput) {
  const response = await api.post<Appointment>(
    "/appointments",
    appointment,
  );
  return response.data;
}

export async function updateAppointmentStatus(
  id: number,
  status: AppointmentStatus,
) {
  const response = await api.patch<Appointment>(`/appointments/${id}`, {
    status,
  });
  return response.data;
}

export async function deleteAppointment(id: number) {
  await api.delete(`/appointments/${id}`);
}
