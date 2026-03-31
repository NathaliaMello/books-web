import Badge from "@/src/components/atoms/Badge";
import BookActions from "@/src/components/Organism/BookActions";
import BookRating from "@/src/components/Organism/BookRating";
import DeleteBookButton from "@/src/components/Organism/DeleteBookButton";
import { getBookById } from "@/src/services/bookService";
import Link from "next/link";


export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(Number(id));

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">

      {/* Navegação */}
      <Link
        href="/books/list"
        className="text-sm text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Voltar para listagem
      </Link>

      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-5">

        {/* Cabeçalho */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-800">{book.title}</h1>
          <p className="text-base text-gray-500">{book.author}</p>
        </div>

        {/* Categorias e rating */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {book.categories.map((category) => (
              <Badge key={category.id} label={category.name} />
            ))}
          </div>
          {book.rating && (
            <div className="flex flex-col items-end gap-1">
              <span className="text-base font-medium text-amber-500">
                ★ {book.rating}
              </span>
              <span className="text-xs text-gray-400">
                {book.ratingCount} {book.ratingCount === 1 ? "avaliação" : "avaliações"}
              </span>
            </div>
          )}
        </div>

        {/* Descrição completa */}
        {book.description && (
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium text-gray-700">Descrição</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{book.description}</p>
          </div>
        )}

        {/* ISBN */}
        {book.isbn && (
          <p className="text-xs text-gray-400">ISBN: {book.isbn}</p>
        )}

        {/* Avaliação — visível para todos, interativo só para autenticados */}
        <BookRating bookId={book.id} currentRating={book.rating} />  

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <BookActions bookId={book.id} />
        </div>

      </div>
    </main>
  );
}