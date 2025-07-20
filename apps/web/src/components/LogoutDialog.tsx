import { createDialogId, useDialogRegistry } from "@/hooks/useDialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { PropsWithChildren } from "react";

const CUSTOMIZED_DIALOG_ID = createDialogId("CUSTOMIZED_DIALOG_ID");

export interface LogoutDialogProps extends PropsWithChildren {
  onFinish?: () => void;
}

const LogoutDialog = () => {
  const { dialog, dismiss } = useLogoutDialog();

  const handleClose = () => {
    dismiss();
    dialog.onFinish?.();
  };

  return (
    <>
      <Dialog
        open={dialog.show}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClose={handleClose}
      >
        <DialogTitle id="dialog-title">Leaving already?</DialogTitle>
        <DialogContent dividers id="dialog-description">
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Logout
          </Button>
          <Button onClick={handleClose}>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const useLogoutDialog = () => {
  return useDialogRegistry<LogoutDialogProps>(CUSTOMIZED_DIALOG_ID);
};

export default LogoutDialog;
