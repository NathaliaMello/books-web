interface ButtonProps {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

export default function Button({
  label,
  loadingLabel = "Aguarde...",
  loading = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors w-full"
    >
      {loading ? loadingLabel : label}
    </button>
  );
}