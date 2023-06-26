import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackbarAl = ({ open, close, severity }) => (
  <Stack spacing={2} sx={{ width: "100%" }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={() => close}>
      <MuiAlert onClose={close} severity={severity} sx={{ width: "100%" }}>
        This is a success message!
      </MuiAlert>
    </Snackbar>
  </Stack>
);

export default SnackbarAl;
