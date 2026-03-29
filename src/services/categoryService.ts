import { Category } from "../types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  return response.json();
}

export async function getCategoryById(id: number): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Categoria não encontrada");
  return response.json();
}

export async function createCategory(name: string): Promise<Category> {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar categoria");
  }
  return response.json();
}

export async function updateCategory(id: number, name: string): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar categoria");
  }
  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao excluir categoria");
}