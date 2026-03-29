"use client";


import { useEffect, useState } from "react";
import FormField from "../molecules/FormField";
import { createBook } from "@/src/services/bookService";
import CategoryCheckboxList from "../molecules/CategoryCheckboxList";
import Button from "../atoms/Button";
import { getCategories } from "@/src/services/categoryService";
import { Category } from "@/src/types";



export default function BookForm() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    rating: "",
    categoryIds: [] as number[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoadingCategories(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCategoryChange(id: number) {
    setForm((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
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
      await createBook({
        title: form.title,
        author: form.author,
        isbn: form.isbn || null,
        rating: form.rating ? parseFloat(form.rating) : null,
        categoryIds: form.categoryIds,
      });

      setSuccess(true);
      setForm({ title: "", author: "", isbn: "", rating: "", categoryIds: [] });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <FormField
        label="Título"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Ex: O Senhor dos Anéis"
        required
      />
      <FormField
        label="Autor"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Ex: J.R.R. Tolkien"
        required
      />
      <FormField
        label="ISBN"
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        placeholder="Ex: 9788595086333"
      />
      <FormField
        label="Rating"
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="Ex: 4.5"
        type="number"
        min="0"
        max="5"
        step="0.1"
      />

      <CategoryCheckboxList
        categories={categories}
        selected={form.categoryIds}
        onChange={handleCategoryChange}
        loading={loadingCategories}
      />

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

      <Button
        type="submit"
        label="Cadastrar livro"
        loadingLabel="Cadastrando..."
        loading={loading}
      />
    </form>
  );
}