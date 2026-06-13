import type { Doctor, DoctorInput } from "../models";
import { api } from "./api";

export async function getDoctors() {
  const response = await api.get<Doctor[]>("/doctors");
  return response.data;
}

export async function createDoctor(doctor: DoctorInput) {
  const response = await api.post<Doctor>("/doctors", doctor);
  return response.data;
}

export async function updateDoctor(id: number, doctor: DoctorInput) {
  const response = await api.put<Doctor>(`/doctors/${id}`, doctor);
  return response.data;
}

export async function deleteDoctor(id: number) {
  await api.delete(`/doctors/${id}`);
}
