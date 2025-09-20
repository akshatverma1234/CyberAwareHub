"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
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
  { id: "title", label: "Title", minWidth: 120 },
  { id: "summary", label: "Summary", minWidth: 150 },
  { id: "createdDate", label: "Created", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 140 },
];

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch("/api/admin/caseStudies");
        if (!res.ok) throw new Error("Failed to fetch case studies");
        const data = await res.json();
        setCaseStudies(data);
      } catch (err) {
        console.error("Error loading case studies:", err);
        setError(err.message);
      }
    };
    fetchCaseStudies();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const deleteCaseStudy = async () => {
    if (!selectedId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/caseStudies/${selectedId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCaseStudies((prev) => prev.filter((c) => c._id !== selectedId));
        context.openAlertBox("success", "Case study deleted successfully");
      } else {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete case study");
      }
    } catch (err) {
      console.error(err);
      context.openAlertBox("error", `Error: ${err.message}`);
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
          <h1 className="text-3xl font-bold">Case Studies</h1>
          <Link href="/admin/caseStudies/new">
            <Button className="!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg">
              ➕ Add New
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 300 }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
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
                {caseStudies
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell className="max-w-[150px] md:max-w-none truncate">
                        {row.title}
                      </TableCell>
                      <TableCell
                        className="max-w-[200px] md:max-w-none truncate"
                        title={row.summary}
                      >
                        {row.summary}
                      </TableCell>
                      <TableCell>
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 justify-center items-center md:justify-center">
                          <Link href={`/admin/caseStudies/${row._id}`}>
                            <Button
                              variant="contained"
                              size="small"
                              className="!min-w-[100px] !rounded-[15px] !bg-gray-200 mb-2 sm:mb-0"
                            >
                              <div className="flex gap-1 items-center text-black justify-center">
                                <MdOutlineEdit size={20} /> Edit
                              </div>
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleDeleteClick(row._id)}
                            variant="contained"
                            color="error"
                            size="small"
                            className="!min-w-[100px] !rounded-[15px]"
                          >
                            <div className="flex gap-1 items-center justify-center">
                              <MdOutlineDeleteOutline size={20} /> Delete
                            </div>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {caseStudies.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No case studies found
            </div>
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={caseStudies.length}
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
        message="Are you sure you want to delete this case study? This action cannot be undone."
        onConfirm={deleteCaseStudy}
        isLoading={isLoading}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default CaseStudies;
