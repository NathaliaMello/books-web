import { Category } from "../types";

const API_URL = "http://localhost:8080/api/v1";

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
    }
    return response.json();
}