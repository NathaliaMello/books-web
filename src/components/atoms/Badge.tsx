interface BadgeProps {
  label: string;
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
      {label}
    </span>
  );
}