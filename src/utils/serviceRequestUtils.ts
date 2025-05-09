// src/utils/serviceRequestUtils.ts

import { type SortingState, type PaginationState } from "@tanstack/react-table";

export function parseIncludeArchivedFromURL(searchParams: URLSearchParams): boolean {
  return searchParams.get("includeArchived") === "true";
}

export function parseSortingFromURL(searchParams: URLSearchParams): SortingState {
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  if (!sort) return []

  const isDesc = order === "desc";
  return [{ id: sort, desc: isDesc }];
}

export function parsePaginationFromURL(
  searchParams: URLSearchParams,
): PaginationState {
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");

  // Ensure pageIndex is not negative and pageSize has a sane default/min/max
  const pageIndex = Math.max(0, parseInt(pageParam || "1", 10) - 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(pageSizeParam || "10", 10)),
  );

  return {
    pageIndex,
    pageSize,
  };
}
