import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/Header";
import PatientTable from "../components/PatientTable";
import AddPatientModal from "../components/AddPatientModal";
import { useCallback, useState, useEffect } from "react";
// import { getPatients, deletePatient } from "../services/patient.service";
import toast from "react-hot-toast";
import DeletePatientModal from "../components/DeletePatientModal";
import type { Patient } from "../models";
import { getApiErrorMessage } from "../services/api";
import { useAuth } from "../auth/auth-context";

function Patients() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null,
  );

  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
    //   const data = await getPatients();

    //   setPatients(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load patients"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // getPatients()
    //   .then(setPatients)
    //   .catch((error) => {
    //     toast.error(getApiErrorMessage(error, "Unable to load patients"));
    //   })
    //   .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (id: number) => {
    setSelectedPatientId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPatientId === null) return;

    try {
    //   await deletePatient(selectedPatientId);

      toast.success("Patient deleted");

      await loadPatients();

      setDeleteOpen(false);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to delete patient"));
    }
  };

  return (
    <DashboardLayout>
      <Header />

      <div className="mt-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Patients</h1>

            <p className="text-slate-500 mt-1">Manage hospital patients</p>
          </div>

          {user?.role !== "LAB" && (
            <button className="primary-button" onClick={() => setOpenModal(true)}>
              Add Patient
            </button>
          )}
        </div>

        <PatientTable
          patients={patients}
          loading={loading}
          onDelete={handleDeleteClick}
          canDelete={user?.role === "ADMIN"}
          canViewHistory={user?.role !== "LAB"}
        />
        <AddPatientModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={loadPatients}
        />
        <DeletePatientModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </DashboardLayout>
  );
}

export default Patients;
