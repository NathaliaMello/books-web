import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Books API",
  description: "Gerenciamento de livros",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}