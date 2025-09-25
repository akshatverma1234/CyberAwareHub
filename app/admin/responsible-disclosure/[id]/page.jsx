"use client";
import { MyContext } from "@/context/AdminAppContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

const ReportDetail = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vulnerabilityType: "",
    vulnSummary: "",
    affectedUrl: "",
    description: "",
    reproduce: "",
    poc: "",
    profileLink: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        if (!id) {
          setError("No report ID provided");
          setLoading(false);
          return;
        }

        console.log("Fetching report with ID:", id);
        setLoading(true);
        setError(null);

        const res = await axios.get(`/api/admin/disclosure/${id}`);
        setFormData(res.data.report);
      } catch (error) {
        console.error("Fetching details failed:", error);

        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Failed to get the report details!";

        setError(errorMessage);

        if (context?.openAlertBox) {
          context.openAlertBox("error", errorMessage);
        }

        if (error.response?.status === 404) {
          setTimeout(() => router.push("/admin/disclosure"), 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, [id, context, router]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "triaged":
        return "info";
      case "resolved":
        return "success";
      case "invalid":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 md:ml-[18%] p-4 md:p-8">
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
            <span className="ml-4 text-gray-600">
              Loading report details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5f6] flex">
        <div className="flex-1 md:ml-[18%] p-4 md:p-8">
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
          <Button
            variant="outlined"
            onClick={() => router.push("/admin/disclosure")}
          >
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      <div className="flex-1 md:ml-[18%] p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Vulnerability Report Details</h1>
          <Button
            variant="outlined"
            onClick={() => router.push("/admin/responsible-disclosure")}
            className="!text-black !bg-white !rounded-[10px] !shadow-md"
          >
            Back to Reports
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Chip
            label={`Status: ${formData.status || "Unknown"}`}
            color={getStatusColor(formData.status)}
            variant="outlined"
          />

          {formData.createdAt && (
            <Chip
              label={`Submitted: ${new Date(
                formData.createdAt
              ).toLocaleDateString()}`}
              variant="outlined"
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Box
            component="div"
            sx={{ "& .MuiTextField-root": { mb: 3, width: "100%" } }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <TextField
                label="Reporter Name"
                name="name"
                value={formData.name}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                className="w-full"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                className="w-full"
              />
              <TextField
                label="Vulnerability Type"
                name="vulnerabilityType"
                value={formData.vulnerabilityType}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                fullWidth
              />
            </div>

            <TextField
              label="Vulnerability Title/Summary"
              name="title"
              value={formData.title || formData.vulnSummary}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              className="mb-6 h-full"
              multiline
            />

            <TextField
              label="Affected URL(s)"
              name="affectedUrl"
              value={formData.affectedUrl}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              className="mb-6"
            />

            <TextField
              label="Detailed Description"
              name="description"
              value={formData.description}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="mb-6"
            />

            <TextField
              label="Steps to Reproduce"
              name="reproduce"
              value={formData.reproduce}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="mb-6"
            />

            <TextField
              label="Proof of Concept"
              name="poc"
              value={formData.poc}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              className="mb-6"
            />
            <TextField
              label="Social Link"
              name="profileLink"
              value={formData.profileLink}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              className="mb-6"
            />
            {formData.impact && (
              <TextField
                label="Impact Description"
                name="impact"
                value={formData.impact}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
              />
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
