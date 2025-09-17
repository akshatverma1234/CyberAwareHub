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
import { ClerkProvider } from "@clerk/nextjs";

const MyContext = createContext();

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
    </ClerkProvider>
  );
};

export default AppProvider;
export { MyContext };
