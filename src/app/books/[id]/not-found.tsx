import Link from "next/link";

export default function BookNotFound() {
  return (
    <main className="max-w-xl mx-auto mt-20 p-6 text-center flex flex-col items-center gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-gray-200">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Livro não encontrado
        </h2>
        <p className="text-sm text-gray-500">
          O livro que você está procurando não existe ou foi removido.
        </p>
      </div>

      <Link
        href="/books/list"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-5 py-2 transition-colors"
      >
        Voltar para listagem
      </Link>
    </main>
  );
}