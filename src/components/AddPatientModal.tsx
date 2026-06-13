import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createPatient } from "../services/patient.service";
import { getApiErrorMessage } from "../services/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type PatientForm = {
  name: string;
  age: number;
  phone: string;
};

function AddPatientModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientForm>();

  const onSubmit = async (data: PatientForm) => {
    try {
      setLoading(true);

      await createPatient(data);

      toast.success("Patient created successfully");

      await onSuccess();

      reset();

      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to create patient"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Create Patient</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>

            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Age</label>

            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Age must be positive",
                },
              })}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Phone</label>

            <input
              {...register("phone", {
                required: "Phone required",
                minLength: {
                  value: 10,
                  message: "Enter valid phone",
                },
              })}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              {loading ? "Saving..." : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
