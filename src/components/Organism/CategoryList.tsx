"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category } from "@/src/types";
import { deleteCategory } from "@/src/services/categoryService";

interface CategoryListProps {
  categories: Category[];
}

function CategoryCard({ category }: { category: Category }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setLoading(true);
    try {
      await deleteCategory(category.id);
      router.refresh();
    } catch {
      alert("Erro ao excluir categoria");
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow px-5 py-4 flex items-center justify-between">
      <span className="text-sm font-medium text-gray-800">{category.name}</span>

      <div className="flex gap-2">
        <Link
          href={`/categories/${category.id}/edit`}
          className="text-sm text-blue-600 hover:underline px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`text-sm px-3 py-1 rounded-lg border transition-colors ${
            confirming
              ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
              : "text-red-600 border-red-200 hover:bg-red-50"
          }`}
        >
          {loading ? "Excluindo..." : confirming ? "Confirmar" : "Excluir"}
        </button>
      </div>
    </div>
  );
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        Nenhuma categoria cadastrada.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}