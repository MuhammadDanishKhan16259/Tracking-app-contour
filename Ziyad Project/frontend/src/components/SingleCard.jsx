import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditForm from "./EditForm";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { GlobalContext } from "../context/Context";
import DeleteForm from "./DeleteForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

export default function ImgMediaCard({ singleData }) {
  const { allWorkouts, setAllWorkouts } = useContext(GlobalContext);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card sx={{ maxWidth: 345, padding: "20px" }}>
        <CardContent>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h4" component="h4">
              {singleData.title}
            </Typography>
            <Typography gutterBottom variant="body2" component="p">
              {singleData.duration} mins.
            </Typography>
          </span>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{ color: "#50A060", fontWeight: "bold" }}
          >
            {singleData.type}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "justify" }}
          >
            {singleData.description}
          </Typography>
          <Typography
            gutterBottom
            sx={{ padding: "10px 0px" }}
            variant="body2"
            component="div"
          >
            {singleData.date}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            sx={{
              color: "#50A060",
              borderColor: "#50A060",
              padding: "5px 40px",
            }}
            size="small"
            onClick={() => {
              setOpen(true);
              setEdit(true);
            }}
          >
            EDIT
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "#50A060",
              backgroundColor: "#edf5ef",
              borderColor: "#50A060",
              padding: "5px 40px",
            }}
            size="small"
            onClick={() => {
              setOpen(true);
              setEdit(false);
            }}
          >
            DELETE
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {edit ? <EditForm setOpen={setOpen} allData={singleData} /> : <DeleteForm setOpen={setOpen} allData={singleData} />}
        </Box>
      </Modal>
    </>
  );
}
