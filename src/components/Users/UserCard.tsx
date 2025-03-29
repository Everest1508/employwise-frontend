import { Link } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import { User } from "../../types/user";

interface UserCardProps {
  user: User;
  viewMode: "list" | "grid";
  onDelete: (id: number) => void;
}

const UserCard = ({ user, viewMode, onDelete }: UserCardProps) => {
  return (
    <div className={`p-4 bg-white shadow-md rounded-lg ${viewMode === "grid" ? "flex flex-col items-center" : "flex items-center space-x-4"}`}>
      {/* Avatar */}
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-14 h-14 rounded-full border shadow-sm"
      />

      {/* User Info */}
      <div className={`flex-1 ${viewMode === "grid" ? "text-center mt-2" : ""}`}>
        <h3 className="font-semibold text-gray-800 text-lg">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-3">
        <Link
          to={`/users/${user.id}`}
          className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          <Eye size={16} />
        </Link>
        <button
          onClick={() => onDelete(user.id)}
          className="px-3 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
