"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/books/list", label: "Livros" },
  { href: "/books/new", label: "Novo livro", adminOnly: true },
  { href: "/categories/list", label: "Categorias" },
  { href: "/categories/new", label: "Nova categoria", adminOnly: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, signOut } = useAuth();

  function handleSignOut() {
    signOut();
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">

        <Link
          href="/books/list"
          className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          📚 Books API
        </Link>

        <ul className="flex items-center gap-1">
          {links
            .filter(link => !link.adminOnly || isAdmin)
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-500">
                Olá, {user?.name}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-600 hover:underline"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}