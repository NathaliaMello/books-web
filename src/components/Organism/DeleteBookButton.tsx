"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/src/services/bookService";
interface DeleteBookButtonProps {
  bookId: number;
}

export default function DeleteBookButton({ bookId }: DeleteBookButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setLoading(true);
    try {
      await deleteBook(bookId);
      router.push("/books/list");
      router.refresh();
    } catch {
      alert("Erro ao excluir livro");
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`flex-1 text-sm font-medium rounded-lg px-4 py-2 transition-colors border ${
        confirming
          ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
          : "bg-white hover:bg-red-50 text-red-600 border-red-300"
      }`}
    >
      {loading ? "Excluindo..." : confirming ? "Confirmar exclusão" : "Excluir"}
    </button>
  );
}