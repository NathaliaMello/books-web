import Input from "../atoms/Input";


interface FormFieldProps {
  label: string;
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

export default function FormField({ label, required, ...inputProps }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input required={required} {...inputProps} />
    </div>
  );
}