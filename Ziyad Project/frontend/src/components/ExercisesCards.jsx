import React, { useState, useEffect, useContext } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ImgMediaCard from "./SingleCard";
import axios from "axios";
import { GlobalContext } from "../context/Context";
import noData from "../assets/no-data.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const { allWorkouts, setAllWorkouts } = useContext(GlobalContext);

  // const [AllData, setAllData] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/workouts");
      setAllWorkouts(data);
      console.log(allWorkouts);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,

        marginTop: "120px",
      }}
    >
      <h1 style={{ fontSize: "42px", margin: "15px ", fontStyle: "italic" }}>
        Your {"  "}
        <span style={{ letterSpacing: "3px", fontWeight: "bolder" }}>
          EXERCISES
        </span>
      </h1>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {allWorkouts.length > 0 ? (
          allWorkouts.map((singleData) => (
            <ImgMediaCard key={singleData._id} singleData={singleData} />
          ))
        ) : (
          <img
            src={noData}
            style={{ width: "30%", minWidth: "400px", objectFit: "contain" }}
            alt="no data image"
          />
        )}
      </Box>
    </Box>
  );
}
