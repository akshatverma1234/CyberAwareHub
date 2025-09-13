"use client";
import React, { useEffect, useState } from "react";
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

const columns = [
  { id: "user", label: "User", minWidth: 80 },
  { id: "title", label: "Title", minWidth: 150 },
  { id: "summary", label: "Summary", minWidth: 200 },
  { id: "createdDate", label: "Created", minWidth: 130 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const CommunityCaseStudies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState(new Set()); // Track which items are being updated
  const [error, setError] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchCommunityStudies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get("/api/community-stories");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch community stories:", error);
        setError("Failed to load community stories. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunityStudies();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      // Add this ID to the updating set
      setUpdatingIds((prev) => new Set([...prev, id]));
      setError(null);

      const res = await axios.patch(`/api/community-stories/${id}`, { status });

      if (res.data.success) {
        setData((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: res.data.caseStudy.status }
              : item
          )
        );
      } else {
        throw new Error(res.data.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      setError(`Failed to ${status} story. Please try again.`);
    } finally {
      // Remove this ID from the updating set
      setUpdatingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDeleteStorie = async (id) => {
    try {
      if (confirm("Delete this case study?")) {
        const res = await fetch(`/api/community-stories/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setData((prev) => prev.filter((c) => c._id !== id));
          alert("✅ Community casestudy deleted!");
        } else {
          const errorData = await res.json();
          alert(`❌ Failed to delete: ${errorData.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error deleting case study:", error);
    }
  };
  // Get status chip color
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

  const pendingCount = data.filter((item) => item.status === "pending").length;
  const approvedCount = data.filter(
    (item) => item.status === "approved"
  ).length;
  const rejectedCount = data.filter(
    (item) => item.status === "rejected"
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 ml-[18%] p-8">
          <div className="flex justify-center items-center h-64">
            <CircularProgress size={50} className="!text-gray-700" />
            <span className="ml-4 text-lg">Loading community stories...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Community Case Studies</h1>

          <div className="flex gap-4 mb-6">
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

        <div className="bg-white rounded-lg shadow-sm">
          <TableContainer sx={{ maxHeight: 440 }}>
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
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isUpdating = updatingIds.has(row._id);
                    return (
                      <TableRow key={row._id} hover>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          <div className="font-medium">{row.title}</div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="max-w-xs truncate"
                            title={row.summary}
                          >
                            {row.summary}
                          </div>
                        </TableCell>
                        <TableCell>
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
                          <div className="flex gap-2 items-center justify-center">
                            <Button
                              onClick={() =>
                                handleStatusUpdate(row._id, "approved")
                              }
                              disabled={isUpdating || row.status === "approved"}
                              variant="contained"
                              color="success"
                              size="small"
                              className="!min-w-[100px] !rounded-[15px]"
                            >
                              {isUpdating ? (
                                <CircularProgress size={16} color="inherit" />
                              ) : (
                                "Approve"
                              )}
                            </Button>
                            <Button
                              onClick={() =>
                                handleStatusUpdate(row._id, "rejected")
                              }
                              disabled={isUpdating || row.status === "rejected"}
                              variant="contained"
                              color="error"
                              size="small"
                              className="!min-w-[100px] !rounded-[15px]"
                            >
                              {isUpdating ? (
                                <CircularProgress size={16} color="inherit" />
                              ) : (
                                "Reject"
                              )}
                            </Button>

                            <Button
                              onClick={() => handleDeleteStorie(row._id)}
                              variant="contained"
                              color="error"
                              size="small"
                              className="!min-w-[100px] !rounded-[15px]"
                            >
                              {isUpdating ? (
                                <CircularProgress size={16} color="inherit" />
                              ) : (
                                <div className="flex gap-1 items-center">
                                  <div className="bg-white rounded-[50%]">
                                    <MdOutlineDeleteOutline
                                      size={24}
                                      className="text-black"
                                    />
                                  </div>
                                  Delete
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

          {data.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No community stories found
            </div>
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityCaseStudies;
