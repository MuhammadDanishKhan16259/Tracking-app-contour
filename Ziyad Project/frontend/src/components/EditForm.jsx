import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { GlobalContext } from "../context/Context";
import { toast } from "react-toastify";
import axios from "axios";

const workouts = [
  {
    value: "Strength Training",
    label: "Strength Training",
  },
  {
    value: "Aerobic Training",
    label: "Aerobic Training",
  },
  {
    value: "Balance and Stability Training",
    label: "Balance and Stability Training",
  },
  {
    value: "Co-ordination and Agility Training",
    label: "Co-ordination and Agility Training",
  },
  {
    value: "Flexibility and Mobility Training",
    label: "Flexibility and Mobility Training",
  },
];

export default function EditForm({ setOpen, allData }) {
  const { allWorkouts, setAllWorkouts } = useContext(GlobalContext);

  const [title, setTitle] = React.useState(allData.title);
  const [description, setDescription] = React.useState(allData.description);
  const [type, setType] = React.useState(allData.type);
  const [duration, setDuration] = React.useState(allData.duration);
  const [date, setDate] = React.useState(allData.date);
  const [titleError, setTitleError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [typeError, setTypeError] = React.useState("");
  const [durationError, setDurationError] = React.useState("");
  const [dateError, setDateError] = React.useState("");

  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const nextMonthDate = nextMonth.toISOString().split("T")[0];

  const notify = () =>
    toast.success("Record Updated Successfully", {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // const validateInputs = () => {
  //   let isValid = true;

  //   if (title.trim() === "") {
  //     setTitleError(true);
  //     isValid = false;
  //   } else {
  //     setTitleError(false);
  //   }

  //   if (description.trim() === "") {
  //     setDescriptionError(true);
  //     isValid = false;
  //   } else {
  //     setDescriptionError(false);
  //   }

  //   if (type.trim() === "") {
  //     setTypeError(true);
  //     isValid = false;
  //   } else {
  //     setTypeError(false);
  //   }

  //   if (duration.trim() === "") {
  //     setDurationError(true);
  //     isValid = false;
  //   } else {
  //     setDurationError(false);
  //   }

  //   if (date.trim() === "") {
  //     setDateError(true);
  //     isValid = false;
  //   } else {
  //     setDateError(false);
  //   }

  //   // Add more validation checks for additional input fields if needed

  //   return isValid;
  // };

  const UpdateToDb = async () => {
    const stringRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const numberRegex = /^[0-9]+$/;
    const durationRegex = /^\d{2}$/;

    if (title.trim() === "") {
      setTitleError("Title can not be empty");
      return;
    } else if (!stringRegex.test(title)) {
      setTitleError("Title can only contain letters.");
      return;
    } else {
      setTitleError("");
    }

    if (type.trim() === "") {
      setTypeError("Type can not be empty");
      return;
    } else {
      setTypeError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Description can not be empty");
      return;
    } else if (!stringRegex.test(description)) {
      setDescriptionError("Description can only contain letters.");
      return;
    } else {
      setDescriptionError("");
    }

    if (duration.trim() === "") {
      setDurationError("Duration can not be empty");
      return;
    } else if (duration.length > 2) {
      setDurationError("Duration can only consist of two numbers.");
      return;
    } else if (!durationRegex.test(duration)) {
      setDurationError("Duration can only contain numbers.");
      return;
    } else {
      setDurationError("");
    }
    if (date.trim() === "") {
      setDateError("Date can not be empty");
      return;
    } else {
      setDateError("");
    }

    try {
      const body = { title, description, type, duration, date };
      const { data } = await axios.put(
        `http://localhost:8080/workout/${allData._id}`,
        body
      );
      notify();
      setAllWorkouts(
        allWorkouts.map((item) => {
          console.log(item, allData, data, body);
          return item._id == allData?._id ? data : item;
        })
      );
      console.log(data);
    } catch (e) {
      alert(e.message);
    }

    setOpen(false);
  };

  //   const descriptionObject = {
  //     "Strength Training":
  //       "Strength training is a form of physical exercise that involves resistance or weight training to increase muscle strength, endurance, and overall power.",
  //     "Aerobic Training":
  //       "Aerobic training is a form of exercise that involves continuous and rhythmic movements to improve cardiovascular fitness by increasing the body's oxygen intake and endurance.",
  //     "Balance and Stability Training":
  //       "Balance and Stability Training focuses on strengthening the muscles involved in balance and stability, enhancing coordination, and reducing the risk of falls and injuries.",
  //     "Co-ordination and Agility Training":
  //       " Co-ordination and Agility Training involves exercises and drills that enhance coordination, balance, spatial awareness, quickness, and reaction time. ",
  //     "Flexibility and Mobility Training":
  //       " Flexibility and Mobility Training involves various stretching, strengthening, and mobility exercises to increase flexibility, joint mobility, and overall functional movement. ",
  //   };

  //     if (type) {
  //         if (type == "Strength Training" ) {
  //             setDescription("Strength training is a form of physical exercise that involves resistance or weight training to increase muscle strength, endurance, and overall power.");
  //       }
  // }

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-controlled"
        label="Title"
        value={title}
        type="text"
        required
        variant="standard"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        helperText={
          <p style={{ color: "red", marginBottom: "0px" }}>{titleError}</p>
        }
      />

      <TextField
        id="outlined-controlled"
        label="Type"
        value={type}
        select
        type="text"
        variant="standard"
        required
        onChange={(event) => {
          setType(event.target.value);
        }}
        helperText={
          <p style={{ color: "red", marginBottom: "0px" }}>{typeError}</p>
        }
      >
        {workouts.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="outlined-controlled"
        label="Description"
        value={description}
        type="text"
        variant="standard"
        // InputProps={{
        //   readOnly: true,
        // }}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        helperText={
          <p style={{ color: "red", marginBottom: "0px" }}>
            {descriptionError}
          </p>
        }
      />

      <TextField
        id="outlined-controlled"
        label="Duration"
        value={duration}
        type="text"
        variant="standard"
        required
        onChange={(event) => {
          setDuration(event.target.value);
        }}
        helperText={
          <p style={{ color: "red", marginBottom: "0px" }}>{durationError}</p>
        }
      />

      <TextField
        id="outlined-controlled"
        // label="Date"
        value={date}
        type="date"
        variant="standard"
        required
        inputProps={{
          min: new Date().toISOString().split("T")[0],
          max: nextMonthDate,
        }}
        onChange={(event) => {
          setDate(event.target.value);
        }}
        helperText={
          <p style={{ color: "red", marginBottom: "0px" }}>{dateError}</p>
        }
        ii
      />

      <Button
        sx={{ backgroundColor: "#50A060" }}
        variant="contained"
        onClick={UpdateToDb}
      >
        UPDATE
      </Button>
    </Box>
  );
}
