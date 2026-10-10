import type { PagedListInformation } from "@/components/tables/shared/interfaces/paged-list-information";

export interface PagedResponse<T> {
  result: T[];
  pagingInformation: PagedListInformation;
  totalCount: number;
  totalPages: number;
}
