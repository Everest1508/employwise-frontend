import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api/user";
import { User } from "../types/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Eye } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users", err);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;
    try {
      const response = await deleteUser(deleteUserId);
      if (response.status === 204) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUserId));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error deleting user", err);
      toast.error("Failed to delete user.");
    } finally {
      setDeleteUserId(null);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold -mt-40 text-gray-800">User List</h2>
      <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Users" }]} />


      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 border w-[98vw] rounded-lg shadow-lg bg-white">
            {users.map((user) => (
              <li key={user.id} className="p-5 flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-14 h-14 rounded-full border shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/users/${user.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-blue-600 transition"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </Link>
                  <button
                    onClick={() => setDeleteUserId(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md flex items-center space-x-2 hover:bg-red-600 transition"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-700 text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {deleteUserId && (
        <div className="fixed inset-0 bg-opacity-5 bg-gray-200 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
