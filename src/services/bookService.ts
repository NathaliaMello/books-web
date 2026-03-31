import { notFound } from "next/navigation";
import { Book, CreateBookRequest, CursorPageResponse, UpdateBookRequest } from "../types";
import { authHeaders } from "./api";


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
    headers: authHeaders(),
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
    headers: authHeaders(),
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
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir livro");
  }
}

export async function getBooksCursor(
  cursor?: number,
  size: number = 6,
  title?: string,
  author?: string,
  categoryId?: number
): Promise<CursorPageResponse<Book>> {
  const query = new URLSearchParams();
  query.append("size", String(size));
  if (cursor) query.append("cursor", String(cursor));
  if (title) query.append("title", title);
  if (author) query.append("author", author);
  if (categoryId) query.append("categoryId", String(categoryId));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/cursor?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) throw new Error("Erro ao buscar livros");
  return response.json();
}

export async function rateBook(id: number, rating: number): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}/rating`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ rating }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao avaliar livro");
  }

  return response.json();
}

export async function getMyRating(bookId: number): Promise<number | null> {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_URL}/books/${bookId}/rating/me`, {
    headers: authHeaders(),
    cache: "no-store",
  });

  if (response.status === 204) return null;
  if (!response.ok) return null;

  const data = await response.json();
  return Number(data.rating);
}