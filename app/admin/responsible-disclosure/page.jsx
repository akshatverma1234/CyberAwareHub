"use client";
import ConfirmDialog from "@/components/Admin/ConfirmDialog/ConfirmDialog";
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
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteReport = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
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

  const handleReportDelete = async () => {
    if (!selectedId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/disclosure/${selectedId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReportList((prev) => prev.filter((c) => c._id !== selectedId));
        context.openAlertBox("success", "Report deleted!");
      } else {
        const errorData = await res.json();
        context.openAlertBox(
          "error",
          `❌ Failed to delete: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      context.openAlertBox("error", `Error deleting report: ${error}`);
    } finally {
      setIsLoading(false);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const getStatusChipColor = (status) => {
    return statusColors[status] || "default";
  };

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
                                <div className="flex flex-col items-center">
                                  <span className="font-medium text-sm">
                                    {row.name || "Unknown"}
                                  </span>
                                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
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

                              <TableCell>
                                <Chip
                                  label={row.status}
                                  color={getStatusChipColor(row.status)}
                                  size="large"
                                  className="capitalize"
                                />
                              </TableCell>

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
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                  <Link
                                    href={`/admin/responsible-disclosure/${row._id}`}
                                  >
                                    <Button
                                      variant="contained"
                                      size="small"
                                      className="!min-w-[100px] !rounded-[15px] !bg-gray-200 mb-2 sm:mb-0"
                                    >
                                      <div className="flex gap-1 items-center text-black justify-center">
                                        <FaRegEye size={20} /> View
                                      </div>
                                    </Button>
                                  </Link>

                                  {row.status === "pending" ? (
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
                                        className="!min-w-[100px] !rounded-[15px] !bg-blue mb-2 sm:mb-0"
                                        disabled={isUpdating}
                                      >
                                        {isUpdating ? (
                                          <CircularProgress
                                            size={16}
                                            color="inherit"
                                          />
                                        ) : (
                                          "Triage"
                                        )}
                                      </Button>
                                    </>
                                  ) : null}

                                  {row.status === "triaged" ? (
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
                                        className="!min-w-[100px] !rounded-[15px] !bg-green-500 mb-2 sm:mb-0"
                                        disabled={isUpdating}
                                      >
                                        {isUpdating ? (
                                          <CircularProgress
                                            size={16}
                                            color="inherit"
                                          />
                                        ) : (
                                          "Resolve"
                                        )}
                                      </Button>
                                    </>
                                  ) : null}

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
                                    {isUpdating ? (
                                      <CircularProgress
                                        size={16}
                                        color="inherit"
                                      />
                                    ) : (
                                      "Invalid"
                                    )}
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteReport(row._id)}
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    className="!min-w-[30px] !rounded-[15px] w-[100px]"
                                    disabled={isUpdating}
                                  >
                                    {isUpdating ? (
                                      <CircularProgress
                                        size={16}
                                        color="inherit"
                                      />
                                    ) : (
                                      <div className="flex gap-1 items-center">
                                        <div className="bg-white rounded-[50%] p-1">
                                          <MdOutlineDeleteOutline
                                            size={18}
                                            className="text-black"
                                          />
                                        </div>
                                        <span className="hidden sm:inline">
                                          Delete
                                        </span>
                                      </div>
                                    )}
                                  </Button>
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
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this report? This action cannot be undone."
        onConfirm={handleReportDelete}
        isLoading={isLoading}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default ResponsibleDisclosurePage;
