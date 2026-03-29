import { Category } from "@/src/types";
import Checkbox from "../atoms/Checkbox";


interface CategoryCheckboxListProps {
  categories: Category[];
  selected: number[];
  onChange: (id: number) => void;
  loading: boolean;
}

export default function CategoryCheckboxList({
  categories,
  selected,
  onChange,
  loading,
}: CategoryCheckboxListProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600">
        Categorias <span className="text-red-500">*</span>
      </label>

      {loading ? (
        <p className="text-sm text-gray-400">Carregando categorias...</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              id={`category-${category.id}`}
              label={category.name}
              checked={selected.includes(category.id)}
              onChange={() => onChange(category.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}