import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import homeImage from "../assets/homeImage.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ColumnsGrid() {
  return (
    <Box sx={{ flexGrow: 1, marginTop:"100px", marginBottom:"50px"  }}>
      <Grid container direction="row" spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: "40px",
            //   lineHeight: "75px",
            }}
          >
            A New Era of Fitness <br /> Standards
          </h1>
          <img src={homeImage} width={500} style={{objectFit:"contain"}} alt="Home Image" />
          <h3
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "20px",
            //   lineHeight: "25px",
              color:'#535353',
            }}
          >
            Conventional ways don’t work. Discover the <br /> BE-FIT methodology
            to fat loss.
          </h3>
        </Grid>
        <Grid item xs={12} sx={{display:"flex", justifyContent:'center', alignItems:'center', gap:"20px", marginTop:'20px'}}>
        <Link to={'/exercises'}><Button sx={{backgroundColor:'#50A060'}} variant="contained">Exercises</Button></Link>
        <Link to={'/about'}><Button sx={{borderColor:'#50A060', color:'#50A060'}} variant="outlined">How It Works</Button></Link>
        </Grid>
      </Grid>
    </Box>
  );
}
