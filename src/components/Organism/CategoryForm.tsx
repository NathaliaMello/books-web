"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/src/types";
import { createCategory, updateCategory } from "@/src/services/categoryService";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";


interface CategoryFormProps {
  category?: Category;
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!category;

  const [name, setName] = useState(category?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await updateCategory(category.id, name);
        router.push("/categories/list");
      } else {
        await createCategory(name);
        router.push("/categories/list");
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <FormField
        label="Nome"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Ficção Científica"
        required
      />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        label={isEditing ? "Salvar alterações" : "Criar categoria"}
        loadingLabel={isEditing ? "Salvando..." : "Criando..."}
        loading={loading}
      />
    </form>
  );
}