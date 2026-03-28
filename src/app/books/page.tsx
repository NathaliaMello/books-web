"use client";

import { Category } from "@/src/models/category.model";
import { useEffect, useState } from "react";

export default function BooksPage() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        isbn: "",
        rating: "",
        categoryIds: [] as number[],
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Busca as categorias da API quando a página carrega
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("http://localhost:8080/api/v1/categories");
                const data = await response.json();
                setCategories(data);
            } catch {
                setError("Erro ao carregar categorias");
            } finally {
                setLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []); // o [] significa: executa só uma vez, quando o componente monta

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleCategoryChange(categoryId: number) {
        setForm((prev) => {
            const already = prev.categoryIds.includes(categoryId);
            return {
                ...prev,
                categoryIds: already
                ? prev.categoryIds.filter((id) => id !== categoryId) // desmarca
                : [...prev.categoryIds, categoryId],                  // marca
            };
        });
    }

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.categoryIds.length === 0) {
      setError("Selecione pelo menos uma categoria");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8080/api/v1/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          author: form.author,
          isbn: form.isbn || null,
          rating: form.rating ? parseFloat(form.rating) : null,
          categoryIds: form.categoryIds,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erro ao cadastrar livro");
      }

      setSuccess(true);
      setForm({ title: "", author: "", isbn: "", rating: "", categoryIds: [] });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Cadastrar livro
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Título *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: O Senhor dos Anéis"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Autor *</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: J.R.R. Tolkien"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">ISBN</label>
          <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 9788595086333"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Rating (0 a 5)</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 4.5"
          />
        </div>

        {/* Categorias */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Categorias *</label>

          {loadingCategories ? (
            <p className="text-sm text-gray-400">Carregando categorias...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.categoryIds.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {success && (
          <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            Livro cadastrado com sucesso!
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          {loading ? "Cadastrando..." : "Cadastrar livro"}
        </button>

      </form>
    </main>
  );
}