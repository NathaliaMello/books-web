"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { getMyRating, rateBook } from "@/src/services/bookService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookRatingProps {
  bookId: number;
  currentRating: number | null;
}

export default function BookRating({ bookId, currentRating }: BookRatingProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState<number>(0);
  const [hovering, setHovering] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            setLoadingPrevious(false);
            return;
        }

        getMyRating(bookId)
            .then((rating) => {
                if (rating !== null) {
                setSelected(rating); // pinta as estrelas com o voto anterior
                }
            })
            .finally(() => setLoadingPrevious(false));
        }, [bookId, isAuthenticated]);

    if (!isAuthenticated) {
        return (
        <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-400 text-center">
            <a href="/login" className="text-blue-600 hover:underline">
                Entre
            </a>{" "}
            para avaliar este livro
            </p>
        </div>
        );
    }

    async function handleRate(rating: number) {
        setSelected(rating);
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
        await rateBook(bookId, rating);
        setSuccess(true);
        router.refresh();
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro ao avaliar");
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">Sua avaliação</p>

        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                disabled={loading}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHovering(star)}
                onMouseLeave={() => setHovering(0)}
                className="text-2xl transition-colors disabled:opacity-50"
            >
                <span
                className={
                    star <= (hovering || selected)
                    ? "text-amber-400"
                    : "text-gray-300"
                }
                >
                ★
                </span>
            </button>
            ))}
        </div>

        {success && (
            <p className="text-green-600 text-sm">Avaliação registrada com sucesso!</p>
        )}
        {error && (
            <p className="text-red-600 text-sm">{error}</p>
        )}
        </div>
    );
}

