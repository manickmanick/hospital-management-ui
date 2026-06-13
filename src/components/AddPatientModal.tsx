import { X } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: () => void;
};

type PatientForm = {
  name: string;
  age: number;
  phone: string;
};

function AddPatientModal({
  open,
  onClose
}: Props) {
  const {
    register,
    handleSubmit,
    reset
  } = useForm<PatientForm>();

  const onSubmit = async (
    data: PatientForm
  ) => {
    console.log(data);

    reset();

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">
            Create Patient
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-medium">
              Name
            </label>

            <input
              {...register("name")}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Age
            </label>

            <input
              type="number"
              {...register("age", {
                valueAsNumber: true
              })}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone
            </label>

            <input
              {...register("phone")}
              className="w-full border rounded-xl px-4 py-3"
            />
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
              className="bg-blue-600 text-white px-5 py-2 rounded-xl"
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;