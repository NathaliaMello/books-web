"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";
import { login } from "@/src/services/authService";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(form);
      signIn(data);
      router.push("/books/list");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <FormField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="seu@email.com"
        required
      />
      <FormField
        label="Senha"
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
        placeholder="••••••"
        required
      />

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        label="Entrar"
        loadingLabel="Entrando..."
        loading={loading}
      />

      <p className="text-sm text-center text-gray-500">
        Não tem conta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}