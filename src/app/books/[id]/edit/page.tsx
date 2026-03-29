
import BookEditForm from "@/src/components/Organism/BookEditForm";
import { getBookById } from "@/src/services/bookService";
import { getCategories } from "@/src/services/categoryService";
import Link from "next/link";

export default async function BookEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [book, categories] = await Promise.all([
    getBookById(Number(id)),
    getCategories(),
  ]);

  return (
    <main className="max-w-xl mx-auto mt-10 p-6">
      <Link
        href={`/books/${id}`}
        className="text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Voltar para detalhes
      </Link>

      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Editar livro
      </h1>

      <BookEditForm book={book} categories={categories} />
    </main>
  );
}