"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress, Chip, Alert, Box } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { MyContext } from "@/context/AdminAppContext";
import ConfirmDialog from "@/components/Admin/ConfirmDialog/ConfirmDialog";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const columns = [
  { id: "user", label: "User", minWidth: 80 },
  { id: "title", label: "Title", minWidth: 150 },
  { id: "summary", label: "Summary", minWidth: 200 },
  { id: "createdDate", label: "Created", minWidth: 130 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const getStatusChipColor = (status) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "default";
  }
};

const CommunityArticleAdminClient = ({ initialStories, initialError }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reportList, setReportList] = useState(initialStories);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [error, setError] = useState(initialError);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const { getToken } = useAuth();

  const pendingCount = useMemo(
    () => reportList.filter((item) => item.status === "pending").length,
    [reportList]
  );
  const approvedCount = useMemo(
    () => reportList.filter((item) => item.status === "approved").length,
    [reportList]
  );
  const rejectedCount = useMemo(
    () => reportList.filter((item) => item.status === "rejected").length,
    [reportList]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusUpdate = async (id, status, email, name) => {
    const token = await getToken();
    setUpdatingIds((prev) => new Set([...prev, id]));
    setError(null);
    try {
      const res = await axios.patch(
        `/api/admin/articleCommunity/${id}`,
        {
          status,
          email,
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setReportList((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: res.data.article.status }
              : item
          )
        );
        context.openAlertBox("success", `Status updated to ${status}`);
      } else {
        throw new Error(res.data.error || "Failed to update status");
      }
    } catch (error) {
      context.openAlertBox(
        "error",
        `Failed to update status: ${error.message}`
      );
      setError(`Failed to ${status} story. Please try again.`);
    } finally {
      setUpdatingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDeleteStory = async () => {
    if (!selectedId) return;
    setConfirmOpen(false);
    try {
      setIsLoading(true);
      const token = await getToken();
      const res = await fetch(`/api/admin/articleCommunity/${selectedId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setReportList((prev) => prev.filter((c) => c._id !== selectedId));
        context.openAlertBox("success", "Article deleted!");
      } else {
        const errorData = await res.json();
        context.openAlertBox(
          "error",
          `❌ Failed to delete: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      setIsLoading(false);
      context.openAlertBox("error", `Error deleting article: ${error.message}`);
    } finally {
      setSelectedId(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 lg:ml-[18%] p-4 sm:p-8 w-full">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              Community Articles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Box className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Pending Review</div>

                <div className="text-2xl font-bold text-orange-600">
                  {pendingCount}
                </div>
              </Box>

              <Box className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Approved</div>

                <div className="text-2xl font-bold text-green-600">
                  {approvedCount}
                </div>
              </Box>

              <Box className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-sm text-gray-600">Rejected</div>

                <div className="text-2xl font-bold text-red-600">
                  {rejectedCount}
                </div>
              </Box>
            </div>

            {error && (
              <Alert
                severity="error"
                className="mb-4"
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
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

                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                    .map((row) => {
                      const isUpdating = updatingIds.has(row._id);

                      return (
                        <TableRow key={row._id} hover>
                          <TableCell className="truncate">
                            <div className="flex flex-col">
                              <span className="font-medium">{row.name}</span>

                              <span className="text-sm text-gray-500">
                                {row.email}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="max-w-[150px] truncate w-[150px]">
                            <div className="font-medium truncate">
                              {row.title}
                            </div>
                          </TableCell>

                          <TableCell className="max-w-[200px] truncate w-[150px]">
                            <div className="truncate" title={row.summary}>
                              {row.summary}
                            </div>
                          </TableCell>

                          <TableCell className="!whitespace-nowrap">
                            {new Date(row.createdAt).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={row.status}
                              color={getStatusChipColor(row.status)}
                              size="large"
                              className="capitalize"
                            />
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col sm:flex-row gap-2 items-center">
                              <Button
                                onClick={() =>
                                  handleStatusUpdate(
                                    row._id,

                                    "approved",

                                    row.email,

                                    row.name
                                  )
                                }
                                disabled={
                                  isUpdating || row.status === "approved"
                                }
                                variant="contained"
                                color="success"
                                size="small"
                                className="!min-w-[100px] !rounded-[15px] w-full"
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} color="inherit" />
                                ) : (
                                  "Approve"
                                )}
                              </Button>

                              <Button
                                onClick={() =>
                                  handleStatusUpdate(
                                    row._id,

                                    "rejected",

                                    row.email,

                                    row.name
                                  )
                                }
                                disabled={
                                  isUpdating || row.status === "rejected"
                                }
                                variant="contained"
                                color="error"
                                size="small"
                                className="!min-w-[100px] !rounded-[15px] w-full"
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} color="inherit" />
                                ) : (
                                  "Reject"
                                )}
                              </Button>

                              <Button
                                onClick={() => handleDeleteClick(row._id)}
                                variant="contained"
                                color="error"
                                size="small"
                                className="!min-w-[100px] !rounded-[15px] w-full"
                                disabled={isUpdating}
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} color="inherit" />
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

            {reportList.length === 0 && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                No community stories found
              </div>
            )}

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={reportList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>

        <ConfirmDialog
          open={confirmOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete this article? This action cannot be undone."
          onConfirm={handleDeleteStory}
          isLoading={isLoading}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </>
  );
};

export default CommunityArticleAdminClient;
