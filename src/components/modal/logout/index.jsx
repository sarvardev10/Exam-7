import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          border: "1px solid #fff",
          padding: "5px 6px",
          borderRadius: "6px",
          backgroundColor: "#ffffff20",
        }}
      >
        <LogoutIcon sx={{ color: "white" }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Do you want to exit?
            </Typography>
            <div style={{ display: "flex", gap: "12px" }}>
              <Button onClick={handleClose} sx={{ color: "#007BFF", borderColor: "#007BFF", border: '1px solid', '&:hover': { borderColor: '#0056b3', color: '#0056b3' } }}>No</Button>
              <Button
                onClick={logOut}
                variant="contained"
                sx={{
                  backgroundColor: "#40E0D0", // Turquoise background color
                  color: "#FFFFFF", // White text color
                  '&:hover': {
                    backgroundColor: "#36CFC9", // Darker turquoise on hover
                  },
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
