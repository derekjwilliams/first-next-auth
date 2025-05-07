"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type SortingState, type PaginationState } from "@tanstack/react-table";
import SimpleServiceRequestsTable from "./SimpleServiceRequestsTable";
import * as stylex from "@stylexjs/stylex";
import { useCallback, useMemo } from "react";
import useTechnicianQuery from "src/hooks/useTechnicianQuery";
import TechnicianDetails from "./TechnicianDetails";
import useServiceRequestsByTechnicianIdQuery from "src/hooks/useServiceRequestsByTechnicianIdQuery";
import { useStatusMapQuery } from "src/hooks/useStatusMapQuery";

interface TechnicianDetailsPageProps {
  technicianId: string;
}

const styles = stylex.create({
  detailsWrapper: {
    margin: "20px",
  },
  serviceRequestsWrapper: {
    padding: "20px",
  },
});

// Helper to get current page size, falling back to a default
const getCurrentPageSize = (
  paginationState: PaginationState,
  defaultSize = 10,
): number => {
  return paginationState?.pageSize || defaultSize;
};

export default function TechnicianDetailsPage({
  technicianId,
}: TechnicianDetailsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- State derived from URL ---
  const sorting = useMemo(
    () => parseSortingFromURL(searchParams),
    [searchParams],
  );
  const pagination = useMemo(
    () => parsePaginationFromURL(searchParams),
    [searchParams],
  );
  const includeArchived = useMemo(
    () => parseIncludeArchivedFromURL(searchParams),
    [searchParams],
  );

  // --- Central URL update handler ---
  const handleStateChange = useCallback(
    (newState: {
      sorting?: SortingState;
      pagination?: PaginationState;
      includeArchived?: boolean;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newState.sorting !== undefined) {
        if (newState.sorting.length > 0) {
          const { id, desc } = newState.sorting[0];
          params.set("sort", id);
          params.set("order", desc ? "desc" : "asc");
        } else {
          params.delete("sort");
          params.delete("order");
        }
      }

      if (newState.pagination !== undefined) {
        params.set("page", (newState.pagination.pageIndex + 1).toString());
        params.set("pageSize", newState.pagination.pageSize.toString());
      }

      if (newState.includeArchived !== undefined) {
        if (newState.includeArchived) {
          params.set("includeArchived", "true")
        } else {
          params.delete("includeArchived")
        }
      }

      const newUrl = `${pathname}?${params.toString()}`;
      // Using router.push to allow back navigation to previous filter states
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // --- Specific event handlers for the table ---
  const handleSortingChange = useCallback(
    (newSorting: SortingState) => {
      handleStateChange({
        sorting: newSorting,
        // Reset to page 1 when sorting changes, keep current page size
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      });
    },
    [handleStateChange, pagination],
  );

  const handlePaginationChange = useCallback(
    (newPagination: PaginationState) => {
      handleStateChange({ pagination: newPagination });
    },
    [handleStateChange],
  );

  const handleIncludeArchivedToggle = useCallback(
    (newIncludeArchivedValue: boolean) => {
      handleStateChange({
        includeArchived: newIncludeArchivedValue,
        // Reset to page 1 when 'includeArchived' changes, keep current page size
        pagination: {
          pageIndex: 0,
          pageSize: getCurrentPageSize(pagination),
        },
      });
    },
    [handleStateChange, pagination],
  );

  // --- Data Fetching ---
  const {
    data: technician,
    isLoading: isLoadingTechnician,
    isError: isErrorTechnician,
    error: errorTechnician,
  } = useTechnicianQuery(technicianId);

  const { data: statusMap = {}, isLoading: statusMapLoading } =
    useStatusMapQuery();

  const {
    data: serviceRequestsData,
    isLoading: isLoadingServiceRequests,
    isError: isErrorServiceRequests,
    error: errorServiceRequests,
  } = useServiceRequestsByTechnicianIdQuery(technicianId, {
    sorting,
    pagination,
    includeArchived,
  }, 
    statusMap,
    statusMapLoading,
  );


  // --- Derived State for Rendering ---
  const isLoading =
    isLoadingTechnician || isLoadingServiceRequests || statusMapLoading;
  const serviceRequests = serviceRequestsData?.data || [];
  const totalCount = serviceRequestsData?.totalCount || 0;

  if (isLoading && !technician && !serviceRequests.length) {
    return <div>Loading technician and service request data...</div>;
  }

  if (isErrorTechnician) {
    return (
      <div>
        Error loading technician details:{" "}
        {errorTechnician?.message || "An unknown error occurred."}
      </div>
    );
  }

  return (
    <div>
      <div {...stylex.props(styles.detailsWrapper)}>
        {technician && <TechnicianDetails technician={technician} />}
        {!technician && !isLoadingTechnician && (
          <strong>{`Technician with ID ${technicianId} not found`}</strong>
        )}
        {isLoadingTechnician && !technician && (
          <div>Loading technician details...</div>
        )}
      </div>
      <div {...stylex.props(styles.serviceRequestsWrapper)}>
        <h2>Service Requests</h2>
        {isErrorServiceRequests ? (
          <div>
            Error loading service requests:{" "}
            {errorServiceRequests?.message || "An unknown error occurred."}
          </div>
        ) : (
          <SimpleServiceRequestsTable
            serviceRequests={serviceRequests}
            totalCount={totalCount}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            includeArchived={includeArchived}
            onIncludeArchivedChange={handleIncludeArchivedToggle} // Use the new handler
            isLoading={isLoadingServiceRequests || statusMapLoading} // Combine loading states for table
            statusMap={statusMap}
          />
        )}
      </div>
    </div>
  );
}

// --- URL Parsing Functions (these seem fine) ---
function parseIncludeArchivedFromURL(searchParams: URLSearchParams): boolean {
  return searchParams.get("includeArchived") === "true";
}

function parseSortingFromURL(searchParams: URLSearchParams): SortingState {
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  if (!sort) return [];

  const isDesc = order === "desc";
  return [{ id: sort, desc: isDesc }];
}

function parsePaginationFromURL(
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
