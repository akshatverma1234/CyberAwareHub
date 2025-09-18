"use client";
import React, { createContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { IoCloseSharp } from "react-icons/io5";
import CaseStudyDialog from "@/components/CaseStudyDialog/CaseStudyDialog";
import AddCaseStudy from "@/components/AddCaseStudy/AddCaseStudy";
import toast, { Toaster } from "react-hot-toast";
import CommunityDialogBox from "@/components/communityDialogBox/CommunityDialogBox";
import { ClerkProvider, useUser } from "@clerk/nextjs";

const MyContext = createContext();

export const AppProvider = ({ children }) => {
  const [isOpenPanel, setOpenPanel] = useState({
    open: false,
    model: "",
    id: null,
  });

  const { isLoaded } = useUser(); // Clerk loading state

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

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#06080e] z-50">
        <iframe
          src="https://lottie.host/embed/96cd76a9-11c2-43ca-9a1d-45301a1ebfa0/t7knQgC6AO.lottie"
          style={{
            width: "400px",
            height: "400px",
            border: "none",
          }}
        ></iframe>
      </div>
    );
  }

  return (
    <MyContext.Provider value={values}>
      <Toaster position="top-right" reverseOrder={false} />

      {children}

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenPanel.open}
        disableEscapeKeyDown
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <IoCloseSharp className="w-[30px] h-[30px] bg-gray-600 text-white rounded-[50%]" />
        </IconButton>

        <DialogContent dividers>
          {isOpenPanel?.model === "caseStudy" && <CaseStudyDialog />}
          {isOpenPanel?.model === "addCaseStudy" && <AddCaseStudy />}
          {isOpenPanel?.model === "openCommunityDialogBox" && (
            <CommunityDialogBox />
          )}
        </DialogContent>
      </Dialog>
    </MyContext.Provider>
  );
};

export default AppProvider;
export { MyContext };
