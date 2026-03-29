import { Book, CreateBookRequest } from "../types";

const API_URL = "http://localhost:8080/api/v1";

export async function createBook(data: CreateBookRequest): Promise<Book> {
    const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao cadastrar livro");
    }
    return response.json();
}