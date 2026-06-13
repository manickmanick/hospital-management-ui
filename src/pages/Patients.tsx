import DashboardLayout from "../layouts/DashboardLayout";
import Header from "../components/Header";
import PatientTable from "../components/PatientTable";
import AddPatientModal from "../components/AddPatientModal";
import { useState, useEffect } from "react";
import { getPatients } from "../services/patient.service";

function Patients() {
    console.log("patient component rendering");
    
  const [openModal, setOpenModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();

      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <DashboardLayout>
      <Header />

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>

            <p className="text-slate-500 mt-1">Manage hospital patients</p>
          </div>

          <button
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
            onClick={() => setOpenModal(true)}
          >
            Add Patient
          </button>
        </div>

        <PatientTable patients={patients} loading={loading} />
        <AddPatientModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={loadPatients}
        />
      </div>
    </DashboardLayout>
  );
}

export default Patients;
