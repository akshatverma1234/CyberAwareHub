"use client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const SubmitReport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vulnType, setVulnType] = useState("");
  const [vulnSummary, setVulnSummary] = useState("");
  const [affectedUrl, setAffectedUrl] = useState("");
  const [description, setDescription] = useState("");
  const [reproduce, setReproduce] = useState("");
  const [poc, setPoc] = useState("");

  const handleChange = (event) => {
    setVulnType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-[#06080e] flex justify-center w-full">
      <form className="p-6 sm:p-8 bg-white rounded shadow-md flex flex-col gap-4 rounded-[15px] w-[60%] mt-[100px] mb-4">
        <div className="text-black text-[30px] font-bold">Submit a Report</div>
        <div className="flex flex-wrap gap-4">
          <TextField
            label="Name"
            variant="outlined"
            className="flex-1 min-w-[200px] shadow-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            className="flex-1 min-w-[200px] shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Vulnerability Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={vulnType}
                label="Vulnerability Type"
                onChange={handleChange}
              >
                <MenuItem value={10}>Broken Access Control</MenuItem>
                <MenuItem value={20}>Cryptographic Failures</MenuItem>
                <MenuItem value={30}>Injection</MenuItem>
                <MenuItem value={40}>Insecure Design</MenuItem>
                <MenuItem value={50}>Security Misconfiguration</MenuItem>
                <MenuItem value={60}>
                  Vulnerable and Outdated Components
                </MenuItem>
                <MenuItem value={70}>
                  Identification and Authentication Failures
                </MenuItem>
                <MenuItem value={80}>
                  Software and Data Integrity Failures
                </MenuItem>
                <MenuItem value={90}>
                  Security Logging and Monitoring Failures
                </MenuItem>
                <MenuItem value={100}>Server-Side Request Forgery</MenuItem>
                <MenuItem value={110}>Others...</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="flex flex-wrap gap-4">
          <TextField
            id="outlined-textarea"
            label="Vulnerability Summary"
            multiline
            rows={3}
            value={vulnSummary}
            onChange={(e) => setVulnSummary(e.target.value)}
            placeholder="Brief description of vulnerability"
            className="w-full shadow-md"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <TextField
            id="outlined-textarea"
            label="Affected Url(s)"
            multiline
            rows={3}
            value={affectedUrl}
            onChange={(e) => setAffectedUrl(e.target.value)}
            placeholder="List the URLs where this vulnerability exits"
            className="w-full shadow-md"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <TextField
            id="outlined-textarea"
            label="Detailed Description"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed technical description of the vulnerability"
            className="w-full shadow-md"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <TextField
            id="outlined-textarea"
            label="Steps to Reproduce"
            multiline
            rows={4}
            value={reproduce}
            onChange={(e) => setReproduce(e.target.value)}
            placeholder="Eg. 1.Go to [URL] 2.Enter [payload/input] 3.Click [button/action] 4.Observe [result]"
            className="w-full shadow-md"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-bold text-red-500">*Important*</span> Upload
            code snippets, screenshots, or other evidence to a Google Drive and
            submit the link below.
          </p>
          <TextField
            id="outlined-textarea"
            label="Proof of Concept"
            multiline
            rows={4}
            value={poc}
            onChange={(e) => setPoc(e.target.value)}
            placeholder="Upload the link of google drive here"
            className="w-full shadow-md"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button className="!bg-black !text-white !shadow-md h-[50px] w-[50%] !text-[16px]">
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitReport;
