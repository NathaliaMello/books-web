import BookFilters from "@/src/components/molecules/BookFilters";
import BookListCursor from "@/src/components/Organism/BookListCursor";
import { getCategories } from "@/src/services/categoryService";


export default async function BooksListPage() {
  const categories = await getCategories();

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Livros cadastrados
      </h1>
      <BookFilters categories={categories} />
      <BookListCursor />
    </main>
  );
}