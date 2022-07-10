import { Snackbar } from "@mui/material";
import { useState, useEffect } from "react";

let openSnackbarFn = () => {};

export default function Notifier() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // eslint-disable-next-line no-shadow
  const openSnackBar = ({ message }) => {
    setOpen(true);
    setMessage(message);
  };

  useEffect(() => {
    openSnackbarFn = openSnackBar;
  }, []);

  const handleSnackbarRequestClose = () => {
    setOpen(false);
    setMessage("");
  };

  const msg = <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: message }} />;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      message={msg}
      autoHideDuration={5000}
      onClose={handleSnackbarRequestClose}
      ContentProps={{
        "aria-describedby": "snackbar-message-id",
      }}
    />
  );
}

export function openSnackbarExported({ message }) {
  openSnackbarFn({ message });
}
