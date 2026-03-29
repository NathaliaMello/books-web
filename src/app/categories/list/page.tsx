
import CategoryList from "@/src/components/Organism/CategoryList";
import { getCategories } from "@/src/services/categoryService";
import Link from "next/link";

export default async function CategoriesListPage() {
  const categories = await getCategories();

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Categorias</h1>
        <Link
          href="/categories/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          Nova categoria
        </Link>
      </div>

      <CategoryList categories={categories} />
    </main>
  );
}