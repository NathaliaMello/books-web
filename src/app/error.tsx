"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Erro capturado:", error);
  }, [error]);

  return (
    <main className="max-w-xl mx-auto mt-20 p-6 text-center flex flex-col items-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-gray-200">Ops!</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Algo deu errado
        </h2>
        <p className="text-sm text-gray-500">
          {error.message || "Ocorreu um erro inesperado. Tente novamente."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-5 py-2 transition-colors"
        >
          Tentar novamente
        </button>
        <Link
          href="/books/list"
          className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg px-5 py-2 border border-gray-300 transition-colors"
        >
          Voltar para listagem
        </Link>
      </div>
    </main>
  );
}