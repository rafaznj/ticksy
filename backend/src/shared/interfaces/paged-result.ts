export interface IPagedResult<T> {
  result: T[];
  totalCount: number;
  totalPages: number;
}
