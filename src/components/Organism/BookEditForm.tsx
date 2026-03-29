"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Book, Category } from "@/src/types";
import { updateBook } from "@/src/services/bookService";
import FormField from "../molecules/FormField";
import CategoryCheckboxList from "../molecules/CategoryCheckboxList";
import Button from "../atoms/Button";


interface BookEditFormProps {
  book: Book;
  categories: Category[];
}

export default function BookEditForm({ book, categories }: BookEditFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    rating: book.rating?.toString() ?? "",
    categoryIds: book.categories.map((c) => c.id),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      await updateBook(book.id, {
        title: form.title,
        author: form.author,
        rating: form.rating ? parseFloat(form.rating) : null,
        categoryIds: form.categoryIds,
      });

      router.push(`/books/${book.id}`);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
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
        required
      />
      <FormField
        label="Autor"
        name="author"
        value={form.author}
        onChange={handleChange}
        required
      />
      <FormField
        label="Rating"
        name="rating"
        value={form.rating}
        onChange={handleChange}
        type="number"
        min="0"
        max="5"
        step="0.1"
        placeholder="Ex: 4.5"
      />

      <CategoryCheckboxList
        categories={categories}
        selected={form.categoryIds}
        onChange={handleCategoryChange}
        loading={false}
      />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        label="Salvar alterações"
        loadingLabel="Salvando..."
        loading={loading}
      />
    </form>
  );
}
