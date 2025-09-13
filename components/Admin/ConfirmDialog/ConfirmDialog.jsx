"use client";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import "./style.css";

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description" className="bg-white">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          {isLoading === true ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <p>Confirm</p>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
