"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import DeleteBookButton from "./DeleteBookButton";

interface BookActionsProps {
  bookId: number;
}

export default function BookActions({ bookId }: BookActionsProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <div className="flex gap-3 pt-2 border-t border-gray-100">
      <Link
        href={`/books/${bookId}/edit`}
        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
      >
        Editar
      </Link>
      <DeleteBookButton bookId={bookId} />
    </div>
  );
}