export interface Page<T> {
  content: T[];
  page: number;
  perPage: number;
  totalElements: number;
  totalPages: number;
}
