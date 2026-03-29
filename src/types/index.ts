export interface Category {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  description: string | null;
  rating: number | null;
  categories: Category[];
  createdAt: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  isbn: string | null;
  rating: number | null;
  categoryIds: number[];
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  rating: number | null;
  categoryIds: number[];
}