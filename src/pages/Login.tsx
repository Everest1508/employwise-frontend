import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../services/api/user";
import { useNavigate } from "react-router-dom"; 
import GradientRectangle from "../components/GradientRectangle";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await login(data);
      console.log("Login successful:", response.data.token);

      localStorage.setItem("token", response.data.token);

      navigate("/users");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen bg-gray-100 overflow-hidden px-4">
      <div className="absolute bottom-[-50vh] left-[-35vh] md:bottom-[-15vh] md:left-[-20vh] rotate-[-25deg] w-[60vh] h-[60vh] sm:w-[40vh] sm:h-[40vh]">
        <GradientRectangle />
      </div>

      <div className="absolute top-[-25vh] right-[-55vh]  md:top-[-15vh] md:right-[-1vh] rotate-[25deg] w-[60vh] h-[60vh] sm:w-[20vh] sm:h-[20vh]">
        <GradientRectangle />
      </div>

      <div className="w-full max-w-xs sm:max-w-sm relative z-10">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 p-3 w-full border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 p-3 w-full border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
