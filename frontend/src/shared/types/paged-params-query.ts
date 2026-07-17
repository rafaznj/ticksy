export interface PagedParamsQuery {
  currentPage?: number;
  pageSize?: number;
  sort?: string;
  order?: string;
  search?: string;
  [key: string]: unknown;
}
