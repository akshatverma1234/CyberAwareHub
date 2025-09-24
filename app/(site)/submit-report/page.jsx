"use client";
import React, { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MyContext } from "@/context/AppContext";

const vulnerabilityTypes = [
  "Broken Access Control",
  "Cryptographic Failures",
  "Injection",
  "Insecure Design",
  "Security Misconfiguration",
  "Vulnerable and Outdated Components",
  "Identification and Authentication Failures",
  "Software and Data Integrity Failures",
  "Security Logging and Monitoring Failures",
  "Server-Side Request Forgery",
  "Others...",
];

const SubmitReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vulnerabilityType: "",
    vulnSummary: "",
    affectedUrl: "",
    description: "",
    reproduce: "",
    poc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const context = useContext(MyContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/disclosure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit bug report");
      }

      context.openAlertBox(
        "success",
        "Bug report submitted successfully! It will be reviewed by our admin team before being published."
      );

      setFormData({
        name: "",
        email: "",
        vulnerabilityType: "",
        vulnSummary: "",
        affectedUrl: "",
        description: "",
        reproduce: "",
        poc: "",
      });
    } catch (error) {
      context.openAlertBox("error", `Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080e] flex justify-center w-full">
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 bg-white rounded shadow-md flex flex-col gap-4 rounded-[15px] max-w-3xl w-full mt-[100px] mb-4"
      >
        <Typography
          variant="h4"
          component="h2"
          className="!text-black !font-bold"
        >
          Submit a Report
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          className="!text-gray-600 !mb-4"
        >
          Thank you for helping us make the platform safer.
        </Typography>

        <TextField
          label="Your Name"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Your Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <FormControl fullWidth>
          <InputLabel id="vuln-type-label">Vulnerability Type</InputLabel>
          <Select
            labelId="vuln-type-label"
            id="vuln-type-select"
            name="vulnerabilityType"
            value={formData.vulnerabilityType}
            label="Vulnerability Type"
            onChange={handleChange}
            required
          >
            {vulnerabilityTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Vulnerability Summary"
          name="vulnSummary"
          multiline
          rows={3}
          value={formData.vulnSummary}
          onChange={handleChange}
          placeholder="Brief description of the vulnerability"
          fullWidth
          required
        />

        <TextField
          label="Affected Url(s)"
          name="affectedUrl"
          multiline
          rows={3}
          value={formData.affectedUrl}
          onChange={handleChange}
          placeholder="List the URLs where this vulnerability exists"
          fullWidth
          required
        />

        <TextField
          label="Detailed Description"
          name="description"
          multiline
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide a detailed technical description of the vulnerability"
          fullWidth
          required
        />

        <TextField
          label="Steps to Reproduce"
          name="reproduce"
          multiline
          rows={4}
          value={formData.reproduce}
          onChange={handleChange}
          placeholder="Eg. 1.Go to [URL] 2.Enter [payload/input] 3.Click [button/action] 4.Observe [result]"
          fullWidth
          required
        />

        <Typography variant="body2" className="!text-gray-500 !mb-2">
          <span className="font-bold text-red-500">*Important*</span> Upload
          code snippets, screenshots, or other evidence to a Google Drive and
          submit the link below.
        </Typography>
        <TextField
          label="Proof of Concept (URL)"
          name="poc"
          value={formData.poc}
          onChange={handleChange}
          placeholder="Upload the link of google drive here"
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !shadow-md !h-[50px] !mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Report"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SubmitReport;
