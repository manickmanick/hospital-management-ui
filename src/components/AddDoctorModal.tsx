import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { DoctorInput } from "../models";
import { getApiErrorMessage } from "../services/api";
import { createDoctor } from "../services/doctor.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddDoctorModal({ open, onClose, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorInput>();

  if (!open) return null;

  const onSubmit = async (input: DoctorInput) => {
    try {
      await createDoctor(input);
      toast.success("Doctor added successfully");
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add doctor"));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <label className="form-label">License number</label>
            <input
              className="form-input"
              {...register("licenseNumber", { required: "License number is required" })}
            />
            {errors.licenseNumber && <p className="form-error">{errors.licenseNumber.message}</p>}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add doctor</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a doctor to the hospital directory.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <form className="space-y-4 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">Full name</label>
            <input
              className="form-input"
              placeholder="Dr. Jane Smith"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Specialization</label>
            <input
              className="form-input"
              placeholder="Cardiology"
              {...register("specialization", {
                required: "Specialization is required",
              })}
            />
            {errors.specialization && (
              <p className="form-error">{errors.specialization.message}</p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                {...register("phone", { required: "Phone is required" })}
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                {...register("email", { required: "Email is required" })}
              />
            </div>
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
              {isSubmitting ? "Saving..." : "Save doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
