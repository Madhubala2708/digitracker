import { classNames } from "../../utils";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function Table({
  columns,
  columnData,
  onSortingChange,
  sorting,
  setSorting,
  className,
  getDatas,
  setFilter,
  globalFilter,
  errorMessage,
  paramToRedirect, // TO INDICATE WHICH PARAM ID USED FOR REDIRECTION
  tdActionFn,
  enableRowSelection,
  rowSelection,
  setRowSelection,
  isPreview
}) {
  /** TANSTACK COLUMN DATA'S */
  const table = useReactTable({
    data: columnData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection
    },
    onGlobalFilterChange: setFilter,
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: enableRowSelection? enableRowSelection : false,
  });
  const setData = (e) => {
    getDatas(e);
  };

  /** USED TO TRIGGER SORTING OF TABLES */
  const toggleSorting = (columnId) => {
    let applyChange = false;
    // Find the column by ID and toggle its sorting state
    const updatedSorting = sorting.map((sort) => {
      if (sort.id === columnId) {
        applyChange = true;
        return {
          id: columnId,
          desc: !sort.desc,
        };
      } else {
        return sort;
      }
    });
    if (applyChange) {
      onSortingChange(columnId, updatedSorting);
    }
  };

  /** HANDLE CLICK EVENT  */
  const handleClickEvent = (id, value) => {
    if (
      id
        .toString()
        .replace(/[0-9]_/, "")
        .replace(/[0-9]/, "") != "edit"
    ) {
      /** ALLOW REDIRECTION OTHER THAN - EDIT/ARCHIVE CELL CLICKS */
      setData(value);
    }
  };

  /** VIRTUAL TABLE */
  const { rows } = table.getRowModel();
  const parentRef = React.useRef();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: React.useCallback(() => 50, []),
    overscan: 50,
  });

  return (
    <div className={classNames("main-table ", className)}>
      <div className="table-container" ref={parentRef}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <tr key={i}>
                {headerGroup?.headers.map((header, ind) => (
                  <th
                    key={ind}
                    colSpan={header?.colSpan}
                    className={`${header?.id.toString().replace(/[0-9]_/, "")}`}
                  >
                    {header?.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header?.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: () => {
                            if (header.column.getCanSort()) {
                              toggleSorting(header.id); // Pass the column ID
                            }
                          },
                        }}
                      >
                        {flexRender(
                          header?.column?.columnDef.header,
                          header?.getContext()
                        )}
                        {header?.column?.getIsSorted() === "asc" && (
                          <span className="icon-up-arrow"></span>
                        )}
                        {header?.column?.getIsSorted() === "desc" && (
                          <span className="icon-down-arrow"></span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel()?.rows?.length == 0 && (
              <tr>
                <td colSpan={"10"} className="error-msg">
                  {errorMessage ? errorMessage : "No Data Found"}
                </td>
              </tr>
            )}
            {/* {table.getRowModel()?.rows?.map((row, i) => (
              <tr key={i}>
                {row.getVisibleCells().map((cell, ind) => (
                  <td
                    key={ind}
                    onClick={() => { handleClickEvent(cell.id, cell.row.original[paramToRedirect]); }}
                    id={cell.row.original[paramToRedirect]}
                    className={`${cell.id
                      .toString()
                      .replace(/[0-9]_/, "")
                      .replace(/[0-9]/, "")}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))} */}
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index];
              const isSelected = rowSelection?.includes(row?.original?.instrument_id);
              return (
                <tr
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={(node) => virtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id + index}
                  onClick={() => (!isPreview && enableRowSelection)? setRowSelection(row) : []}
                  className={isSelected || !enableRowSelection ? 'selected-row' : ''}
                >
                  {tdActionFn === false &&
                    row.getVisibleCells().map((cell, ind) => (
                      <td
                        key={cell.id + ind}
                        id={cell.row.original[paramToRedirect]}
                        className={`${cell.id
                          .toString()
                          .replace(/[0-9]_/, "")
                          .replace(/[0-9]/, "")}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}

                  {(tdActionFn === true || tdActionFn === undefined) &&
                    row.getVisibleCells().map((cell, ind) => (
                      <td
                        key={cell.id + ind}
                        onClick={() => {
                          handleClickEvent(
                            cell.id,
                            cell.row.original[paramToRedirect]
                          );
                        }}
                        id={cell.row.original[paramToRedirect]}
                        className={`${cell.id
                          .toString()
                          .replace(/[0-9]_/, "")
                          .replace(/[0-9]/, "")}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
