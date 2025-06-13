import React, { createContext, useContext, useState, useCallback } from "react";
import SnackbarAlert from "../components/SnackbarAlert"; 

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showSnackbar = useCallback((msg, sev = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
};
