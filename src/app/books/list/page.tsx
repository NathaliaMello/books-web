import BookFilters from "@/src/components/molecules/BookFilters";
import BookList from "@/src/components/Organism/BookList";
import { getBooks } from "@/src/services/bookService";
import { getCategories } from "@/src/services/categoryService";


interface SearchParams {
  title?: string;
  author?: string;
  categoryId?: string;
}

export default async function BooksListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [books, categories] = await Promise.all([
    getBooks({
      title: params.title,
      author: params.author,
      categoryId: params.categoryId ? Number(params.categoryId) : undefined,
    }),
    getCategories(),
  ]);

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Livros cadastrados
      </h1>

      <BookFilters
        categories={categories}
        initialTitle={params.title}
        initialAuthor={params.author}
        initialCategoryId={params.categoryId}
      />

      <BookList books={books} />
    </main>
  );
}