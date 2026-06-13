import type { PrescriptionMedicine } from "../models";
import { api } from "./api";

export async function createPrescription(input: {
  appointmentId: number;
  diagnosis: string;
  notes?: string | null;
  medicines: PrescriptionMedicine[];
}) {
  const response = await api.post("/prescriptions", input);
  return response.data;
}
