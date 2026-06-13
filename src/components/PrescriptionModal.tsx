import { Plus, Trash2, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Appointment, PrescriptionMedicine } from "../models";
import { getApiErrorMessage } from "../services/api";
import { createPrescription } from "../services/prescription.service";

type Form = { diagnosis: string; notes?: string; medicines: PrescriptionMedicine[] };

export default function PrescriptionModal({ appointment, onClose }: { appointment: Appointment | null; onClose: () => void }) {
  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<Form>({
    defaultValues: { medicines: [{ medicineName: "", dosage: "", frequency: "", duration: "", instructions: "" }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "medicines" });
  if (!appointment) return null;

  const submit = async (form: Form) => {
    try {
      await createPrescription({ appointmentId: appointment.id, diagnosis: form.diagnosis, notes: form.notes || null, medicines: form.medicines });
      toast.success("Prescription saved");
      reset();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save prescription"));
    }
  };

  return <div className="modal-backdrop"><div className="modal-card max-h-[90vh] overflow-y-auto">
    <div className="modal-header"><div><h2 className="text-xl font-bold">Prescribe medicine</h2><p className="text-sm text-slate-500">{appointment.patientName}</p></div><button onClick={onClose}><X /></button></div>
    <form className="space-y-4 p-6" onSubmit={handleSubmit(submit)}>
      <div><label className="form-label">Diagnosis</label><textarea className="form-input" required {...register("diagnosis")} /></div>
      {fields.map((field, index) => <div key={field.id} className="rounded-xl border border-slate-200 p-4">
        <div className="mb-3 flex justify-between"><strong>Medicine {index + 1}</strong>{fields.length > 1 && <button type="button" onClick={() => remove(index)}><Trash2 size={17} /></button>}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="form-input" placeholder="Medicine name" required {...register(`medicines.${index}.medicineName`)} />
          <input className="form-input" placeholder="Dosage" required {...register(`medicines.${index}.dosage`)} />
          <input className="form-input" placeholder="Frequency" required {...register(`medicines.${index}.frequency`)} />
          <input className="form-input" placeholder="Duration" required {...register(`medicines.${index}.duration`)} />
        </div>
        <input className="form-input mt-3" placeholder="Instructions" {...register(`medicines.${index}.instructions`)} />
      </div>)}
      <button type="button" className="secondary-button" onClick={() => append({ medicineName: "", dosage: "", frequency: "", duration: "", instructions: "" })}><Plus size={17} /> Add medicine</button>
      <div><label className="form-label">Notes</label><textarea className="form-input" {...register("notes")} /></div>
      <div className="flex justify-end gap-3"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save prescription"}</button></div>
    </form>
  </div></div>;
}
