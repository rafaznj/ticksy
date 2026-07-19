import { IQueryOptions } from "../types/query-options";

export default function buildPagedOptions(options: IQueryOptions) {
  const limit =
    typeof options.pageSize === "string" ? parseInt(options.pageSize) : options.pageSize;

  const offset = (options.currentPage - 1) * limit;

  return { limit, offset };
}
