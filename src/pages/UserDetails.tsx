import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser, updateUser } from "../services/api/user";
import { User } from "../types/user";
import { toast } from "react-toastify";
import { Pencil, Save, ArrowLeft } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import GradientRectangle from "../components/GradientRectangle";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", avatar: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUser(Number(id));
        const userData = response.data.data;
        setUser(userData);
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          avatar: userData.avatar,
        });
      } catch (error) {
        toast.error("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, avatar: imageUrl });
    }
  };

  const handleSubmit = async () => {
    try {
      await updateUser(Number(id), formData);
      setUser((prevUser) => ({ ...prevUser!, ...formData }));
      setIsEditing(false);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden px-4 flex flex-col">
      {/* Background Gradient Rectangles */}
      <div className="absolute bottom-[-50vh] left-[-35vh] md:bottom-[-15vh] md:left-[-20vh] rotate-[-25deg] w-[60vh] h-[60vh] sm:w-[40vh] sm:h-[40vh]">
        <GradientRectangle />
      </div>
      <div className="absolute top-[-25vh] right-[-55vh] md:top-[-15vh] md:right-[-1vh] rotate-[25deg] w-[60vh] h-[60vh] sm:w-[20vh] sm:h-[20vh]">
        <GradientRectangle />
      </div>

      <div className="py-6 z-20">  
        <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
        <Breadcrumb paths={[{ name: "Users", link: "/users" }, { name: `${user.first_name} ${user.last_name}` }]} />
      </div>

      <div className="flex flex-grow justify-center -mt-52 items-center relative z-10">
        <div className="w-full max-w-xl">
          <div className="flex flex-col items-center gap-6 mb-6">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <img src={formData.avatar} alt="Avatar" className="w-32 h-32 rounded-full border border-gray-300" />
              {isEditing && <p className="text-sm text-blue-500 mt-2">Click to change</p>}
            </label>
            {isEditing && (
              <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700">First Name</label>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className={`w-full px-4 py-2 border rounded-md ${isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"}`} 
              />
            </div>
            <div>
              <label className="text-gray-700">Last Name</label>
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                disabled={!isEditing} 
                className={`w-full px-4 py-2 border rounded-md ${isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"}`} 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              disabled={!isEditing} 
              className={`w-full px-4 py-2 border rounded-md ${isEditing ? "bg-white border-gray-400" : "bg-gray-100 border-gray-300"}`} 
            />
          </div>
          <div className="flex justify-between gap-4 mt-6">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
              >
                <Pencil size={16} />
                Edit
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600 transition"
              >
                <Save size={16} />
                Save
              </button>
            )}
            <Link 
              to="/users" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <ArrowLeft className="text-white" size={16} />
                <span className="text-white">Back</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default UserDetails;
