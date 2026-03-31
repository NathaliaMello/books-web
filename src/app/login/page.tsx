import LoginForm from "@/src/components/Organism/LoginForm";


export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Entrar
      </h1>
      <LoginForm />
    </main>
  );
}