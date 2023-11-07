export interface PaginationRequest {
  search?: string;
  sort?: string;
  direction?: boolean;
  currentPage?: number;
  pageSize?: number;
}
