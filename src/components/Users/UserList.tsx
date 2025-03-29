import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/api/user";
import { User } from "../../types/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutList, Grid } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";
import UserCard from "../Users/UserCard";
import Pagination from "../Users/Pagination";
import DeleteConfirmation from "../Users/DeleteConfirmation";
import UserFilters from "../Users/UserFilters";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [visibleColumns, setVisibleColumns] = useState({
    avatar: true,
    firstName: true,
    lastName: true,
    email: true,
  });

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(page);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
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
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold -mt-12 text-gray-800">User List</h2>
      <Breadcrumb paths={[{ name: "Home", link: "/" }, { name: "Users" }]} />

      <div className="flex gap-6 mt-6">
        {/* Updated UserFilters to include visibleColumns */}
        <UserFilters
          users={users}
          setFilteredUsers={setFilteredUsers}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />

        <div className="w-3/4">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-400 transition"
            >
              {viewMode === "list" ? <Grid size={16} /> : <LayoutList size={16} />}
              <span>{viewMode === "list" ? "Grid View" : "List View"}</span>
            </button>
          </div>

          {loading ? (
            <p className="text-center text-lg text-gray-600">Loading...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No users found.</p>
          ) : (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} viewMode={viewMode} onDelete={setDeleteUserId} />
                ))}
              </div>
            ) : (
              <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                    {visibleColumns.avatar && <th className="border p-3 text-left">Avatar</th>}
                      {visibleColumns.firstName && <th className="border p-3 text-left">First Name</th>}
                      {visibleColumns.lastName && <th className="border p-3 text-left">Last Name</th>}
                      {visibleColumns.email && <th className="border p-3 text-left">Email</th>}
                      <th className="border p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border">
                        {visibleColumns.avatar && (
                            <td className="border p-3">
                                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-10 h-10 rounded-full" />
                            </td>
                        )}
                        {visibleColumns.firstName && <td className="border p-3">{user.first_name}</td>}
                        {visibleColumns.lastName && <td className="border p-3">{user.last_name}</td>}
                        {visibleColumns.email && <td className="border p-3">{user.email}</td>}
                        <td className="border p-3">
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                            onClick={() => setDeleteUserId(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>

      <DeleteConfirmation deleteUserId={deleteUserId} onConfirmDelete={confirmDelete} onCancel={() => setDeleteUserId(null)} />
    </div>
  );
};

export default UserList;
