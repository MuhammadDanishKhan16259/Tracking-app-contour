import { Box, Button, Modal, Typography } from "@mui/material";
import * as React from "react";
import Form from '../components/Form'

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
  };

export default function BasicModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{
          backgroundColor: "#50A060",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "2.5rem",
          position: "fixed",
          bottom: "50px",
          right: "50px",
        }}

        onClick={handleOpen}
      >
        +
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form setOpen={setOpen} />
        </Box>
      </Modal>
    

    </div>
  );
}
