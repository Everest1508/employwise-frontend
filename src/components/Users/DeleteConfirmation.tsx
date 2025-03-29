interface DeleteConfirmationProps {
    deleteUserId: number | null;
    onConfirmDelete: () => void;
    onCancel: () => void;
  }
  
  const DeleteConfirmation = ({ deleteUserId, onConfirmDelete, onCancel }: DeleteConfirmationProps) => {
    if (!deleteUserId) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-5 bg-gray-200 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmation;
  