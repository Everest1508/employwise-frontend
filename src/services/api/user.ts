import axios from "axios";
import { User } from "../../types/user";

const API_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface GetUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}

interface GetUserDetailsResponse {
  data: User;
}

export const login = (credentials: { email: string; password: string }) => 
  api.post<{ token: string }>("/login", credentials);

export const getUsers = (page: number) => 
  api.get<GetUsersResponse>("/users", { params: { page } });

export const getUser = (id: number) => 
  api.get<GetUserDetailsResponse>("/users/" + id);

export const updateUser = (id: number, data: Partial<User>) => 
  api.put<User>(`/users/${id}`, data);

export const deleteUser = (id: number) => 
  api.delete(`/users/${id}`);
