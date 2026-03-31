import RegisterForm from "@/src/components/Organism/RegisterForm";


export default function RegisterPage() {
  return (
    <main className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Criar conta
      </h1>
      <RegisterForm />
    </main>
  );
}