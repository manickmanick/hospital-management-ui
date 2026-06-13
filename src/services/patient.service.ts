import type { Patient, PatientHistory, PatientInput } from "../models";
import { api } from "./api";

export async function getPatients() {
  const response = await api.get<Patient[]>("/patients");
  return response.data;
}

export async function createPatient(patient: PatientInput) {
  const response = await api.post<Patient>("/patients", patient);
  return response.data;
}

export async function deletePatient(id: number) {
  await api.delete(`/patients/${id}`);
}

export async function updatePatient(id: number, patient: PatientInput) {
  const response = await api.put<Patient>(`/patients/${id}`, patient);
  return response.data;
}

export async function getPatientHistory(id: number) {
  const response = await api.get<PatientHistory>(`/patients/${id}/history`);
  return response.data;
}
