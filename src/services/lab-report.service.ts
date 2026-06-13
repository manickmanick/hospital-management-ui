import { api } from "./api";

export async function uploadLabReport(input: {
  patientId: number;
  testName: string;
  notes?: string;
  storageType: "LOCAL" | "S3";
  file: File;
}) {
  const form = new FormData();
  form.append("patientId", String(input.patientId));
  form.append("testName", input.testName);
  form.append("storageType", input.storageType);
  if (input.notes) form.append("notes", input.notes);
  form.append("file", input.file);

  const response = await api.post("/lab-reports", form, {
    headers: { "Content-Type": undefined },
  });
  return response.data;
}

export async function openLabReport(id: number, fileName: string) {
  const response = await api.get<Blob>(`/lab-reports/${id}/file`, {
    responseType: "blob",
  });
  const url = URL.createObjectURL(response.data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.download = fileName;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
