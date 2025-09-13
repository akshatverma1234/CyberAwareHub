"use client";
import React, { createContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Button, Slide } from "@mui/material";

const MyContext = createContext();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AppProvider = ({ children }) => {
  const [isOpenPanel, setOpenPanel] = useState({
    open: false,
    model: "",
    id: null,
  });

  const handleClose = () => {
    setOpenPanel({ open: false, model: "", id: null });
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };
  const values = {
    isOpenPanel,
    setOpenPanel,
    openAlertBox,
    handleClose,
  };

  return (
    <ClerkProvider>
      <MyContext.Provider value={values}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
        <Dialog
          open={isOpenPanel.open}
          slots={{
            transition: Transition,
          }}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </MyContext.Provider>
    </ClerkProvider>
  );
};

export default AppProvider;
export { MyContext };
