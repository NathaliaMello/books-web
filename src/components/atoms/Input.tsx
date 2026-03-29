interface InputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
}

export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  step,
  required,
}: InputProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      min={min}
      max={max}
      step={step}
      required={required}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}