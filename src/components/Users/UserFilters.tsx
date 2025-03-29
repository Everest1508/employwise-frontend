import { useState, useEffect } from "react";
import { User } from "../../types/user";
import { ChevronDown, ChevronUp } from "lucide-react";

interface UserFiltersProps {
  users: User[];
  setFilteredUsers: (users: User[]) => void;
  visibleColumns: { avatar: boolean; firstName: boolean; lastName: boolean; email: boolean };
  setVisibleColumns: (columns: any) => void;
}

const UserFilters = ({ users, setFilteredUsers, visibleColumns, setVisibleColumns }: UserFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof User>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortField, sortOrder, users]);

  const applyFilters = () => {
    let filtered = [...users];

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    setFilteredUsers(filtered);
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev: any) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="p-5 w-80 bg-white shadow-lg rounded-xl border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          placeholder="Search users..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Sort By</label>
        <div className="flex items-center space-x-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as keyof User)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          >
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            {sortOrder === "asc" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mt-4">Columns</h3>
        <div className="mt-2 space-y-2">
          {Object.keys(visibleColumns).map((key) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={visibleColumns[key as keyof typeof visibleColumns]}
                onChange={() => toggleColumn(key as keyof typeof visibleColumns)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-700 capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFilters;