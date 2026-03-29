interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function Checkbox({ id, checked, onChange, label }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-600"
      />
      {label}
    </label>
  );
}