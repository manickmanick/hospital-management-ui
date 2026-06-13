import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { AppointmentInput, Doctor, Patient } from "../models";
import { getApiErrorMessage } from "../services/api";
import { createAppointment } from "../services/appointment.service";
import { getDoctors } from "../services/doctor.service";
import { getPatients } from "../services/patient.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddAppointmentModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>();

  useEffect(() => {
    if (!open) return;

    Promise.all([getPatients(), getDoctors()])
      .then(([patientData, doctorData]) => {
        setPatients(patientData);
        setDoctors(doctorData);
      })
      .catch((error) => {
        toast.error(getApiErrorMessage(error, "Unable to load form options"));
      });
  }, [open]);

  if (!open) return null;

  const onSubmit = async (input: AppointmentInput) => {
    try {
      await createAppointment(input);
      toast.success("Appointment scheduled");
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to schedule appointment"));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Schedule appointment
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a patient, doctor, date, and time.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <form className="space-y-4 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="form-label">Patient</label>
              <select
                className="form-input"
                {...register("patientId", {
                  required: "Select a patient",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              {errors.patientId && (
                <p className="form-error">{errors.patientId.message}</p>
              )}
            </div>
            <div>
              <label className="form-label">Doctor</label>
              <select
                className="form-input"
                {...register("doctorId", {
                  required: "Select a doctor",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              {errors.doctorId && (
                <p className="form-error">{errors.doctorId.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                min={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "Date is required" })}
              />
            </div>
            <div>
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-input"
                {...register("time", { required: "Time is required" })}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Reason</label>
            <textarea
              rows={3}
              className="form-input resize-none"
              {...register("reason")}
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
