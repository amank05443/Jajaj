import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const alertStyles = {
  success: {
    icon: (
      <CheckCircleIcon
        sx={{ fontSize: 30, color: "green", boxShadow: "0 0 5px green" }}
      />
    ),
    color: "green",
    bg: "#e8f5e9",
    border: "2px solid #66bb6a",
  },
  error: {
    icon: (
      <ErrorIcon
        sx={{ fontSize: 30, color: "red", boxShadow: "0 0 5px red" }}
      />
    ),
    color: "red",
    bg: "#ffebee",
    border: "2px solid #ef5350",
  },
  warning: {
    icon: (
      <WarningIcon
        sx={{ fontSize: 30, color: "#ffa726", boxShadow: "0 0 5px #ffa726" }}
      />
    ),
    color: "#ffa726",
    bg: "#fff8e1",
    border: "2px solid #ffb300",
  },
  info: {
    icon: (
      <InfoIcon
        sx={{ fontSize: 30, color: "#1976d2", boxShadow: "0 0 5px #1976d2" }}
      />
    ),
    color: "#1976d2",
    bg: "#e3f2fd",
    border: "2px solid #42a5f5",
  },
};

const CustomAlert = ({
  open,
  type = "info",
  title,
  message,
  data = null,
  onClose,
  autoHideDuration = 3000,
}) => {
  const style = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    if (open && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: style.bg,
          border: style.border,
          boxShadow: 6,
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {style.icon}
          <Typography variant="h6" sx={{ color: style.color }}>
            {title || type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ color: "#333", fontSize: "1rem" }}>
          {message}
        </Typography>
        {data && (
          <Box
            mt={2}
            sx={{
              backgroundColor: "#f5f5f5",
              p: 2,
              borderRadius: 1,
              fontFamily: "monospace",
              color: "#222",
              whiteSpace: "pre-wrap",
              border: `1px solid ${style.color}`,
            }}
          >
            {JSON.stringify(data, null, 2)}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ backgroundColor: style.color }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomAlert;
