import type { AuthResponse, LoginInput, User } from "../models";
import { api } from "./api";

export async function login(input: LoginInput) {
  const response = await api.post<AuthResponse>("/auth/login", input);
  return response.data;
}

export async function getUsers() {
  const response = await api.get<User[]>("/users");
  return response.data;
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: User["role"];
  doctorId?: number | null;
}) {
  const response = await api.post<{ id: number }>("/users", input);
  return response.data;
}

export async function deleteUser(id: number) {
  await api.delete(`/users/${id}`);
}
