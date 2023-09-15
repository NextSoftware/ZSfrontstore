import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar: React.FC<SnackbarProps> = ({severity, message}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{
        '& > div': {
          top: 70,
          right: 20,
          position: 'fixed',
        },
      }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '25%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbar;
