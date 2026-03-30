"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Book } from "@/src/types";
import { getBooksCursor } from "@/src/services/bookService";
import BookCard from "../molecules/BookCard";
import Button from "../atoms/Button";


const PAGE_SIZE = 10;

export default function BookListCursor() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") ?? undefined;
  const author = searchParams.get("author") ?? undefined;
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;

  const [books, setBooks] = useState<Book[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setBooks([]);
    setNextCursor(null);

    getBooksCursor(undefined, PAGE_SIZE, title, author, categoryId)
      .then((data) => {
        setBooks(data.content);
        setNextCursor(data.nextCursor);
        setHasNext(data.hasNext);
      })
      .finally(() => setLoading(false));
  }, [title, author, categoryId]);

  async function loadMore() {
    if (!nextCursor) return;
    setLoadingMore(true);
    try {
      const data = await getBooksCursor(
        nextCursor,
        PAGE_SIZE,
        title,
        author,
        categoryId
      );
      setBooks((prev) => [...prev, ...data.content]);
      setNextCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        Carregando livros...
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-10">
        Nenhum livro encontrado.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {hasNext && (
        <div className="flex justify-center">
          <Button
            label="Carregar mais"
            loadingLabel="Carregando..."
            loading={loadingMore}
            onClick={loadMore}
          />
        </div>
      )}

      {!hasNext && books.length > 0 && (
        <p className="text-sm text-gray-400 text-center">
          Todos os livros foram carregados.
        </p>
      )}
    </div>
  );
}