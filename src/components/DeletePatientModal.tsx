type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeletePatientModal({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-xl font-semibold">Delete Patient</h2>

        <p className="text-slate-500 mt-2">
          Are you sure you want to delete this patient?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-xl">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePatientModal;
