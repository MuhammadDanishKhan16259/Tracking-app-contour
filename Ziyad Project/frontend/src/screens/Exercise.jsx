import React from "react";
import ExerciseCards from "../components/ExercisesCards";
import FormModal from "../components/FormModal";
import Navbar from '../components/Navbar'

const Exercise = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Navbar />
      <ExerciseCards />
      <FormModal />
    </div>
  );
};



export default Exercise;
