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
  ratingCount: number;
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

export interface CursorPageResponse<T> {
  content: T[];
  nextCursor: number | null;
  hasNext: boolean;
  size: number;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}