"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Category } from "@/src/types";
import Input from "../atoms/Input";
import Button from "../atoms/Button";


interface BookFiltersProps {
  categories: Category[];
  initialTitle?: string;
  initialAuthor?: string;
  initialCategoryId?: string;
}

export default function BookFilters({
  categories,
  initialTitle = "",
  initialAuthor = "",
  initialCategoryId = "",
}: BookFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [title, setTitle] = useState(initialTitle);
  const [author, setAuthor] = useState(initialAuthor);
  const [categoryId, setCategoryId] = useState(initialCategoryId);

  function handleSearch() {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (author) params.set("author", author);
    if (categoryId) params.set("categoryId", categoryId);

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setTitle("");
    setAuthor("");
    setCategoryId("");
    router.push(pathname);
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4 mb-6">
      <h2 className="text-sm font-medium text-gray-700">Filtros</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Título</label>
          <Input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Senhor dos Anéis"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Autor</label>
          <Input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ex: Tolkien"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Categoria</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
        >
          Limpar
        </button>
        <Button
          label="Buscar"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}