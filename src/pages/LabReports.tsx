import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Patient } from "../models";
import { getApiErrorMessage } from "../services/api";
import { uploadLabReport } from "../services/lab-report.service";
import { getPatients } from "../services/patient.service";

type Form = {
  patientId: number;
  testName: string;
  notes?: string;
  storageType: "LOCAL" | "S3";
  file: FileList;
};

export default function LabReports() {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Form>({ defaultValues: { storageType: "LOCAL" } });

  useEffect(() => {
    getPatients().then(setPatients).catch((error) => toast.error(getApiErrorMessage(error)));
  }, []);

  if (user?.role !== "LAB" && user?.role !== "ADMIN") return <Navigate to="/" replace />;

  const submit = async (form: Form) => {
    const file = form.file.item(0);
    if (!file) return;
    try {
      await uploadLabReport({ patientId: form.patientId, testName: form.testName, notes: form.notes, storageType: form.storageType, file });
      toast.success("Lab report uploaded");
      reset({ storageType: "LOCAL" });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Upload failed"));
    }
  };

  return <DashboardLayout><Header />
    <div className="page-heading"><div><h1>Lab reports</h1><p>Assign scans and test files to a patient.</p></div></div>
    <div className="mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
      <form className="space-y-5" onSubmit={handleSubmit(submit)}>
        <div><label className="form-label">Patient</label><select className="form-input" required {...register("patientId", { valueAsNumber: true })}><option value="">Select patient</option>{patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name} - {patient.phone}</option>)}</select></div>
        <div><label className="form-label">Test name</label><input className="form-input" required placeholder="Complete blood count" {...register("testName")} /></div>
        <div><label className="form-label">Storage location</label><select className="form-input" {...register("storageType")}><option value="LOCAL">Local server</option><option value="S3">AWS S3 cloud</option></select></div>
        <div><label className="form-label">File</label><input className="form-input" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required {...register("file")} /><p className="mt-1 text-xs text-slate-500">JPEG, PNG, WebP, or PDF up to 10 MB.</p></div>
        <div><label className="form-label">Notes</label><textarea className="form-input" rows={3} {...register("notes")} /></div>
        <button className="primary-button" disabled={isSubmitting}><Upload size={18} />{isSubmitting ? "Uploading..." : "Upload report"}</button>
      </form>
    </div>
  </DashboardLayout>;
}
