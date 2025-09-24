"use client";
import { MyContext } from "@/context/AdminAppContext";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const columns = [
  { id: "reporter", label: "Reporter", minWidth: 120 },
  { id: "type", label: "Vulnerability Type", minWidth: 180 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "date", label: "Date", minWidth: 130 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const statusColors = {
  pending: "warning",
  triaged: "info",
  resolved: "success",
  invalid: "error",
};

const ResponsibleDisclosurePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [updatingIds, setUpdatingIds] = useState(new Set());

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("/api/admin/disclosure");

        if (response.data && Array.isArray(response.data.reports)) {
          setReportList(response.data.reports);
        } else if (Array.isArray(response.data)) {
          setReportList(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setError("Failed to load reports. Please refresh the page.");
        setReportList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleStatusUpdate = async (id, status, email, name) => {
    try {
      setUpdatingIds((prev) => new Set([...prev, id]));
      setError(null);

      const res = await axios.patch(`/api/admin/disclosure/${id}`, {
        status,
        email,
        name,
      });

      if (res.data.success) {
        setReportList((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: res.data.report?.status || status }
              : item
          )
        );

        if (context?.openAlertBox) {
          context.openAlertBox("success", `Status updated to ${status}`);
        }
      } else {
        throw new Error(res.data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";

      if (context?.openAlertBox) {
        context.openAlertBox(
          "error",
          `Failed to update status: ${errorMessage}`
        );
      }
      setError(`Failed to update status to ${status}. Please try again.`);
    } finally {
      setUpdatingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const getStatusChip = (status) => (
    <Chip
      label={status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
      color={statusColors[status] || "default"}
      size="small"
      variant="outlined"
    />
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 lg:ml-[18%] p-4 sm:p-8 w-full">
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 lg:ml-[18%] p-4 sm:p-8 w-full">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Vulnerability Reports Management
          </h1>

          {error && (
            <Alert
              severity="error"
              className="mb-4"
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {reportList.length === 0 && !isLoading ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-lg font-medium">
                  No vulnerability reports found
                </div>
                <div className="text-sm mt-2">
                  Reports will appear here when submitted
                </div>
              </div>
            ) : (
              <>
                <TableContainer className="overflow-x-auto">
                  <Table stickyHeader aria-label="vulnerability reports table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#f8f9fa",
                              fontWeight: "bold",
                            }}
                            className="!whitespace-nowrap"
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const isUpdating = updatingIds.has(row._id);
                          return (
                            <TableRow key={row._id} hover>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="font-medium text-sm">
                                    {row.name || "Unknown"}
                                  </span>
                                  <span className="text-xs text-gray-500 truncate max-w-[100px]">
                                    {row.email || "No email"}
                                  </span>
                                </div>
                              </TableCell>
                              {/* 
                              <TableCell className="max-w-[200px]">
                                <div
                                  className="font-medium text-sm truncate"
                                  title={row.title || row.summary}
                                >
                                  {row.title ||
                                    row.summary ||
                                    "No title provided"}
                                </div>
                              </TableCell> */}

                              <TableCell className="max-w-[180px]">
                                <div
                                  className="text-sm truncate"
                                  title={row.vulnerabilityType}
                                >
                                  {row.vulnerabilityType || "Not specified"}
                                </div>
                              </TableCell>

                              <TableCell>{getStatusChip(row.status)}</TableCell>

                              <TableCell className="!whitespace-nowrap">
                                <div className="text-sm">
                                  {row.createdAt
                                    ? new Date(
                                        row.createdAt
                                      ).toLocaleDateString()
                                    : "Unknown date"}
                                </div>
                              </TableCell>

                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {isUpdating ? (
                                    <CircularProgress size={20} />
                                  ) : (
                                    <>
                                      {row.status === "pending" && (
                                        <>
                                          <Button
                                            onClick={() =>
                                              handleStatusUpdate(
                                                row._id,
                                                "triaged",
                                                row.email,
                                                row.name
                                              )
                                            }
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className="!rounded-lg !text-xs !min-w-0 !px-2"
                                            disabled={isUpdating}
                                          >
                                            Triage
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleStatusUpdate(
                                                row._id,
                                                "invalid",
                                                row.email,
                                                row.name
                                              )
                                            }
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            className="!rounded-lg !text-xs !min-w-0 !px-2"
                                            disabled={isUpdating}
                                          >
                                            Invalid
                                          </Button>
                                        </>
                                      )}

                                      {row.status === "triaged" && (
                                        <>
                                          <Button
                                            onClick={() =>
                                              handleStatusUpdate(
                                                row._id,
                                                "resolved",
                                                row.email,
                                                row.name
                                              )
                                            }
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            className="!rounded-lg !text-xs !min-w-0 !px-2"
                                            disabled={isUpdating}
                                          >
                                            Resolve
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleStatusUpdate(
                                                row._id,
                                                "invalid",
                                                row.email,
                                                row.name
                                              )
                                            }
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            className="!rounded-lg !text-xs !min-w-0 !px-2"
                                            disabled={isUpdating}
                                          >
                                            Invalid
                                          </Button>
                                        </>
                                      )}

                                      {(row.status === "resolved" ||
                                        row.status === "invalid") && (
                                        <div className="text-gray-500 text-xs">
                                          No actions
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={reportList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className="border-t"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsibleDisclosurePage;
