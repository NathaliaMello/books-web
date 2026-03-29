import { Book } from "@/src/types";
import BookCard from "../molecules/BookCard";


interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        Nenhum livro encontrado.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}