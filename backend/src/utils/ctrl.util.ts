export function getPublicApi() {
  return ["auth/login", "auth/logout"];
}

export function applyPagination(
  limit: number = 10,
  page: number = 1,
  data: any
) {
  const startIndex = (page - 1) * limit ? 1 : (page - 1) * limit;
  const endIndex = page * limit;
  const result = {
    next: {},
    previous: {},
    items: {},
  };
  if (endIndex < data.length) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  result.items = data.slice(startIndex, startIndex + limit);
  return result;
}

export function applySort(
  sortBy: keyof any,
  sortOrder: "asc" | "desc",
  query: any
) {
  query = query.orderBy(sortBy, sortOrder.toUpperCase());
  return query;
}

export function applySearch(keySearch: string, value: string, query: any) {
  query = query.where(keySearch, value);
  return query;
}
export function applyFilter(keySearch: string, value: string, query: any) {
  query = query.where(keySearch, value);
  return query;
}
