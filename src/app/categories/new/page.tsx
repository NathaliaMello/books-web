
import CategoryForm from "@/src/components/Organism/CategoryForm";
import ProtectedRoute from "@/src/components/Organism/ProtectedRoute";
import Link from "next/link";

export default function NewCategoryPage() {
  return (
    <ProtectedRoute adminOnly>
        <main className="max-w-xl mx-auto mt-10 p-6">
        <Link
            href="/categories/list"
            className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
            ← Voltar para categorias
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Nova categoria
        </h1>
        <CategoryForm />
        </main>
    </ProtectedRoute>
  );
}