export interface IQueryOptions {
  currentPage: number;
  pageSize: number;
  sort?: string;
  order?: string;
  search?: string;
  columnsComparison?: string[];
  softDeleteFilter?: boolean;
  [key: string]: unknown;
}
