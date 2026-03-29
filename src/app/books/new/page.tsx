import BookForm from "@/src/components/Organism/BookForm";


export default function BooksPage() {
  return (
    <main className="max-w-xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Cadastrar livro
      </h1>
      <BookForm />
    </main>
  );
}