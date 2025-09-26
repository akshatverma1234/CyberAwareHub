"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { MyContext } from "@/context/AdminAppContext";
import ConfirmDialog from "@/components/Admin/ConfirmDialog/ConfirmDialog";

const columns = [
  { id: "title", label: "Title", minWidth: 150 },
  { id: "summary", label: "Summary", minWidth: 200 },
  { id: "createdDate", label: "Created", minWidth: 130 },
  { id: "actions", label: "Actions", minWidth: 180 },
];

const Articles = ({ initialArticles, initialError }) => {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const deleteArticle = async () => {
    if (!selectedId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/articles/${selectedId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((c) => c._id !== selectedId));
        context.openAlertBox("success", "Article deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      context.openAlertBox("error", "Failed to delete article");
    } finally {
      setIsLoading(false);
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex flex-col md:flex-row">
      <div className="flex-1 md:ml-[18%] p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-3xl font-bold mb-4">Articles</h1>
          <Link href="/admin/articles/new">
            <Button className="!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg mb-4">
              ➕ Add New
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <TableContainer sx={{ minWidth: 650 }}>
            <Table stickyHeader aria-label="articles table">
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
                {articles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isUpdating = updatingIds.has(row._id);
                    return (
                      <TableRow key={row._id} hover>
                        <TableCell>
                          <div className="font-medium truncate max-w-[120px] md:max-w-[300px]">
                            {row.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="max-w-xs md:max-w-[300px] truncate"
                            title={row.summary}
                          >
                            {row.summary}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                            <Link href={`/admin/articles/${row._id}`}>
                              <Button
                                variant="contained"
                                size="small"
                                className="!min-w-[100px] !rounded-[15px] !bg-gray-200"
                              >
                                {isUpdating ? (
                                  <CircularProgress size={16} color="inherit" />
                                ) : (
                                  <div className="flex gap-1 items-center text-black">
                                    <MdOutlineEdit size={24} />
                                    Edit
                                  </div>
                                )}
                              </Button>
                            </Link>
                            <Button
                              onClick={() => handleDeleteClick(row._id)}
                              variant="contained"
                              color="error"
                              size="small"
                              className="!min-w-[100px] !rounded-[15px]"
                            >
                              <div className="flex gap-1 items-center">
                                <div className="bg-white rounded-full">
                                  <MdOutlineDeleteOutline
                                    size={24}
                                    className="text-black"
                                  />
                                </div>
                                Delete
                              </div>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {articles.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No articles found
            </div>
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={articles.length}
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
        onConfirm={deleteArticle}
        isLoading={isLoading}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default Articles;
