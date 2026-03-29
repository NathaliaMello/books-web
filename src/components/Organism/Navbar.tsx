"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/books/list", label: "Livros" },
  { href: "/books/new", label: "Novo livro" },
  { href: "/categories/list", label: "Categorias" },
  { href: "/categories/new", label: "Nova categoria" },
];

export default function Navbar() {
  const pathname = usePathname();

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
          {links.map((link) => (
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

      </div>
    </nav>
  );
}