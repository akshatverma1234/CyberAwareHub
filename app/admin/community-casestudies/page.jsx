"use client";
import React, { useContext, useEffect, useState } from "react";
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
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const context = useContext(MyContext);

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

  useEffect(() => {
    fetchCommunityStudies();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDeleteStorie = async () => {
    if (!selectedId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/community-stories/${selectedId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        context.openAlertBox("success", "Community case study deleted!");
        await fetchCommunityStudies(); // ✅ refresh list
      } else {
        const errorData = await res.json();
        context.openAlertBox(
          "error",
          `❌ Failed to delete: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      context.openAlertBox("error", `Error deleting case study: ${error}`);
    } finally {
      setIsLoading(false);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 ml-[18%] p-8 flex justify-center items-center">
          <CircularProgress size={50} className="!text-gray-700" />
          <span className="ml-4 text-lg">Loading community stories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 ml-[18%] p-8">
        <h1 className="text-2xl font-bold mb-4">Community Case Studies</h1>

        {error && (
          <Alert
            severity="error"
            className="mb-4"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
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
                        <TableCell>
                          {row.name}
                          <p>{row.email}</p>
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.summary}</TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={getStatusChipColor(row.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDeleteClick(row._id)}
                            variant="contained"
                            color="error"
                            size="small"
                            className="!min-w-[100px] !rounded-[15px]"
                          >
                            {isUpdating ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              <div className="flex gap-1 items-center">
                                <MdOutlineDeleteOutline size={20} />
                                Delete
                              </div>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
          />
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this case study? This action cannot be undone."
        onConfirm={handleDeleteStorie}
        isLoading={isLoading}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default CommunityCaseStudies;
