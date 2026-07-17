export default async function buildPagedReturn<T>(
  records: T[],
  limit: number,
  totalRecords: number,
) {
  if (!records || records.length < 1) {
    return { result: [], totalCount: 0, totalPages: 0 };
  }

  const totalPages = Math.ceil(totalRecords / limit);

  return { result: records, totalCount: totalRecords, totalPages };
}
