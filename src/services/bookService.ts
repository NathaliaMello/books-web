import { notFound } from "next/navigation";
import { Book, CreateBookRequest, UpdateBookRequest } from "../types";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBooks(params?: {
  title?: string;
  author?: string;
  categoryId?: number;
}): Promise<Book[]> {
  const query = new URLSearchParams();

  if (params?.title) query.append("title", params.title);
  if (params?.author) query.append("author", params.author);
  if (params?.categoryId) query.append("categoryId", String(params.categoryId));

  const url = `${API_URL}/books?${query.toString()}`;
  console.log("URL chamada:", url);  // <- log temporário

  const response = await fetch(url, { cache: "no-store" });

  console.log("Status:", response.status);  // <- log temporário

  if (!response.ok) {
    const body = await response.text();
    console.log("Erro body:", body);  // <- log temporário
    throw new Error("Erro ao buscar livros");
  }

  return response.json();
}

export async function createBook(data: CreateBookRequest): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao cadastrar livro");
  }

  return response.json();
}

export async function getBookById(id: number): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound(); 
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar livro");
  }

  return response.json();
}

export async function updateBook(id: number, data: UpdateBookRequest): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar livro");
  }

  return response.json();
}

export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir livro");
  }
}