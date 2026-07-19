import type { PagedListInformation } from "@/shared/types/paged-list-information";

export interface PagedResponse<T> {
  result: T[];
  pagingInformation: PagedListInformation;
  totalCount: number;
  totalPages: number;
}
