import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddDoctorModal from "../components/AddDoctorModal";
import DoctorTable from "../components/DoctorTable";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Doctor } from "../models";
import { getApiErrorMessage } from "../services/api";
import { deleteDoctor, getDoctors } from "../services/doctor.service";
import { useAuth } from "../auth/auth-context";

export default function Doctors() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setDoctors(await getDoctors());
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load doctors"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch((error) => {
        toast.error(getApiErrorMessage(error, "Unable to load doctors"));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await deleteDoctor(id);
      toast.success("Doctor deleted");
      await loadDoctors();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to delete doctor"));
    }
  };

  return (
    <DashboardLayout>
      <Header />
      <div className="page-heading">
        <div>
          <h1>Doctors</h1>
          <p>Manage doctors and their availability.</p>
        </div>
        {user?.role === "ADMIN" && (
          <button className="primary-button" onClick={() => setOpen(true)}>
            <Plus size={18} /> Add doctor
          </button>
        )}
      </div>
      <DoctorTable
        doctors={doctors}
        loading={loading}
        onDelete={handleDelete}
        canDelete={user?.role === "ADMIN"}
      />
      <AddDoctorModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadDoctors}
      />
    </DashboardLayout>
  );
}
