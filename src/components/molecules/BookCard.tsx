import { Book } from "@/src/types";
import Badge from "../atoms/Badge";


interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-500">{book.author}</p>
      </div>

      {book.description && (
        <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {book.categories.map((category) => (
            <Badge key={category.id} label={category.name} />
          ))}
        </div>

        {book.rating && (
          <span className="text-sm font-medium text-amber-500">
            ★ {book.rating}
          </span>
        )}
      </div>

      {book.isbn && (
        <p className="text-xs text-gray-400">ISBN: {book.isbn}</p>
      )}

    </div>
  );
}