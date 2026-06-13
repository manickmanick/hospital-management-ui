import { ArrowLeft, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import type { PatientHistory } from "../models";
import { getApiErrorMessage } from "../services/api";
import { openLabReport } from "../services/lab-report.service";
import { getPatientHistory } from "../services/patient.service";

export default function PatientDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const [history, setHistory] = useState<PatientHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getPatientHistory(Number(id)).then(setHistory).catch((error) => toast.error(getApiErrorMessage(error, "Unable to load history"))).finally(() => setLoading(false));
  }, [id]);

  if (user?.role === "LAB") return <Navigate to="/lab-reports" replace />;

  return <DashboardLayout><Header />
    <div className="mt-8"><Link to="/patients" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={17} />Patients</Link></div>
    {loading ? <div className="empty-card">Loading medical history...</div> : !history ? <div className="empty-card">Patient not found.</div> : <>
      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-bold text-slate-900">{history.patient.name}</h1>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3"><p><strong>Phone:</strong> {history.patient.phone}</p><p><strong>Age:</strong> {history.patient.age ?? "-"}</p><p><strong>Blood group:</strong> {history.patient.bloodGroup ?? "-"}</p><p className="sm:col-span-3"><strong>Allergies:</strong> {history.patient.allergies || "None recorded"}</p></div>
      </div>
      <section className="mt-8"><h2 className="text-xl font-bold text-slate-900">Prescriptions</h2>{!history.prescriptions.length ? <div className="empty-card mt-4">No prescriptions recorded.</div> : history.prescriptions.map((prescription) => <div key={prescription.id} className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{prescription.diagnosis}</strong><span className="text-sm text-slate-500">{prescription.doctorName} - {new Date(prescription.prescribedAt).toLocaleDateString()}</span></div><div className="mt-4 overflow-x-auto"><table className="w-full"><thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead><tbody>{prescription.medicines.map((medicine, index) => <tr key={medicine.id ?? index}><td>{medicine.medicineName}</td><td>{medicine.dosage}</td><td>{medicine.frequency}</td><td>{medicine.duration}</td></tr>)}</tbody></table></div></div>)}</section>
      <section className="mt-8"><h2 className="text-xl font-bold text-slate-900">Lab reports</h2>{!history.labReports.length ? <div className="empty-card mt-4">No lab reports uploaded.</div> : <div className="mt-4 grid gap-4 md:grid-cols-2">{history.labReports.map((report) => <button key={report.id} onClick={() => void openLabReport(report.id, report.originalFileName)} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-blue-300"><span className="rounded-xl bg-blue-50 p-3 text-blue-600"><FileText /></span><span><strong className="block text-slate-900">{report.testName}</strong><span className="text-sm text-slate-500">{report.originalFileName} - {report.storageType}</span></span></button>)}</div>}</section>
    </>}
  </DashboardLayout>;
}
