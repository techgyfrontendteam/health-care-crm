import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { cn } from '../../../utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef as TanStackColumnDef,
} from '@tanstack/react-table';

export interface ColumnDef<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  render: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  // Server-side pagination
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  // Sorting
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  // Optional
  emptyMessage?: string;
  rowKey: (row: T) => string | number;
  offset?: number;
  maxHeight?: string;
  containerHeight?: string;
  variant?: 'default' | 'embed';
}

const SkeletonRow = ({ columns }: { columns: number }) => (
  <TableRow>
    {Array.from({ length: columns }).map((_, i) => (
      <TableCell key={i}>
        <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse w-3/4" />
      </TableCell>
    ))}
  </TableRow>
);

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  sortField,
  sortOrder,
  onSort,
  emptyMessage = 'No records found.',
  rowKey,
  offset = 0,
  maxHeight,
  containerHeight,
  variant = 'default',
}: DataTableProps<T>) {
  const totalPages = Math.ceil(total / limit);
  const globalStart = (page - 1) * limit;
  const from = total === 0 ? 0 : globalStart + 1;
  const to = Math.min(globalStart + limit, total);

  const relativeStart = Math.max(0, globalStart - offset);
  const slicedData = data.slice(relativeStart, relativeStart + limit);

  const tanstackColumns = React.useMemo<TanStackColumnDef<T, any>[]>(() => {
    return columns.map((col) => ({
      id: col.key,
      header: () => col.header,
      cell: (info) => col.render(info.row.original, info.row.index),
      size: col.width ? parseInt(col.width) : undefined,
      meta: {
        width: col.width,
        sortable: col.sortable,
      },
    }));
  }, [columns]);

  const table = useReactTable({
    data: slicedData,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden"
      )}
      style={
        containerHeight || maxHeight
          ? {
              height: containerHeight || maxHeight,
              maxHeight: containerHeight || maxHeight,
            }
          : undefined
      }
    >
      {/* Table Container - Unified scroll container: horizontal scrollbar sits at bottom above pagination */}
      <div
        className={cn(
          "relative flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-0",
          variant === 'default' && "bg-transparent border-none dark:border-zinc-800 bg-white dark:bg-zinc-950"
        )}
      >
        <Table containerClassName="w-max min-w-full overflow-visible" className="min-w-full border-collapse">
          <TableHeader className="sticky top-0 z-20 bg-[#F8F9FA] dark:bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as { width?: string; sortable?: boolean } | undefined;
                  return (
                    <TableHead
                      key={header.id}
                      style={meta?.width ? { width: meta.width, minWidth: meta.width } : undefined}
                      className={cn(
                        "font-semibold text-gray-500 dark:text-zinc-400 text-[11px] uppercase tracking-wider h-[54px] whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900",
                        meta?.sortable && "p-0"
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        meta?.sortable ? (
                          <button
                            onClick={() => onSort?.(header.id)}
                            className="flex items-center gap-1.5 w-full h-full px-4 py-3 hover:bg-zinc-100/50 dark:hover:bg-zinc-800 transition-colors text-left whitespace-nowrap"
                          >
                            <span className="truncate">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            <div className="flex flex-col opacity-40 shrink-0">
                              {sortField === header.id ? (
                                sortOrder === 'asc' ? <ArrowUp className="h-2.5 w-2.5" /> : <ArrowDown className="h-2.5 w-2.5" />
                              ) : (
                                <ArrowUpDown className="h-2.5 w-2.5" />
                              )}
                            </div>
                          </button>
                        ) : (
                          <div className={cn("px-4 py-3 whitespace-nowrap", header.id === 'selection' && "px-0")}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <SkeletonRow key={i} columns={columns.length} />
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-12 text-zinc-400 text-sm">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn("text-sm text-gray-700 dark:text-zinc-300 px-4 py-3.5", cell.column.id === 'selection' && "px-0")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls - Fixed at Bottom */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#f0f4f8] dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-b-xl shrink-0 z-10">
        {/* Left text + Rows per page */}
        <div className="flex items-center gap-4 text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">
          <div>
            Showing <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{from} - {to}</span> of{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{total.toLocaleString()}</span> Records
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Rows:</span>
            <Select
              value={String(limit)}
              onValueChange={(val) => {
                onLimitChange(Number(val));
                onPageChange(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px] text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg">
                <SelectValue placeholder={String(limit)} />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-[99999] min-w-[70px] max-h-[300px] overflow-y-auto custom-scrollbar">
                {[10, 20, 25, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)} className="text-xs cursor-pointer">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right pagination buttons */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 flex items-center gap-1.5 text-xs font-medium shadow-none"
            disabled={isLoading || page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-1">
            {/* First page + Dots */}
            {page > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => onPageChange(1)}
                >
                  1
                </Button>
                {page > 2 && <span className="px-1 text-xs text-zinc-400">...</span>}
              </>
            )}

            {/* Current page */}
            <Button
              variant="default"
              size="sm"
              className="h-8 w-8 p-0 rounded-lg text-xs bg-[#063669] hover:bg-[#052d58] text-white shadow-sm font-bold"
            >
              {page}
            </Button>

            {/* Dots + last page */}
            {totalPages > 1 && totalPages > page && (
              <>
                {totalPages > page + 1 && <span className="px-1 text-xs text-zinc-400">...</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 flex items-center gap-1.5 text-xs font-medium shadow-none"
            disabled={isLoading || page >= totalPages || total === 0}
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
