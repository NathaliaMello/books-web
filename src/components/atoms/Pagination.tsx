interface PaginationProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Pagination({
  page,
  totalPages,
  onNext,
  onPrev,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Anterior
      </button>

      <span className="text-sm text-gray-500">
        Página {page + 1} de {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages - 1}
        className="text-sm px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Próxima →
      </button>
    </div>
  );
}