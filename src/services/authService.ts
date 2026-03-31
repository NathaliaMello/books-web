import { AuthResponse, LoginRequest, RegisterRequest } from "../types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Email ou senha incorretos");
  }

  return response.json();
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    const error = text ? JSON.parse(text) : {};
    throw new Error(error.message || "Erro ao criar conta");
  }

  return response.json();
}