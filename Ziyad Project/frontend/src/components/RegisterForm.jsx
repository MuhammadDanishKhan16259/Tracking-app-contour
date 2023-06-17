import React, { useState } from "react";
import logo from "../assets/logo.png";
import signIn from "../assets/SigninIcon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../app.css";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as EmailValidator from "email-validator";

const RegisterForm = () => {
  const [formState, setFormState] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setUserNameError("");
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = async () => {
    const usernameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

    if (value.username.trim() === "") {
      setUserNameError("Username can not be empty.");
      return;
    } else if (!usernameRegex.test(value.username)) {
      setUserNameError("Username must only contain alphabets.");
      return;
    }

    if (value.email.trim() === "") {
      setEmailError("Email can not be empty.");
      return;
    } else if (!EmailValidator.validate(value.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/;
    if (value.password.trim() === "") {
      setPasswordError("Password can not be empty.");
      return;
    } else if (value.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else if (!passwordRegex.test(value.password)) {
      setPasswordError(
        "Password must contain at least one letter, one number and one special character."
      );
      return;
    }

    console.log("ALL GOOD");
    try {
      const {
        status,
        // data: { token, refreshToken },
      } = await axios.post(`http://localhost:8080/${formState}`, value);
      if (status === 201) {
        navigate("/");
      }
    } catch (err) {
      alert(err.response.data.error);
    } 
  };

  return (
    <main className="FormComponent" style={{ width: "50%" }}>
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
          padding: "30px",
        }}
      >
        <img
          src={logo}
          alt="Brand Logo"
          width={120}
          height={100}
          style={{ objectFit: "contain" }}
        />
        <p style={{ margin: "15px 0px", color: "#000", opacity: "0.5" }}>
          Welcome back!
        </p>
        <section style={{ backgroundColor: "white" }}>
          <h2 style={{ fontSize: "34px" }}>Sign Up</h2>
          <div style={{ margin: "25px 0px" }}>
            <TextField
              id="standard-controlled"
              name="username"
              label="Username"
              value={value.username}
              onChange={handleChange}
              error={!!userNameError}
              helperText={userNameError}
              sx={{
                marginTop: "10px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                color: "black",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ margin: "25px 0px" }}>
            <TextField
              id="standard-controlled"
              name="email"
              label="Email"
              value={value.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={(event) => {
                if (event.keyCode === 32) {
                  event.preventDefault();
                }
              }}
              sx={{
                marginTop: "10px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                color: "black",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ margin: "10px 0px" }}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                sx={{
                  outline: "none",
                  border: "none",
                  color: "black",
                  width: "100%",
                  fontSize: "14px",
                }}
                value={value.password}
                onChange={handleChange}
                onKeyDown={(event) => {
                  if (event.keyCode === 32) {
                    event.preventDefault();
                  }
                }}
                error={!!passwordError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {passwordError && (
                <FormHelperText error>{passwordError}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div style={{ margin: "10px 0px" }}>
            <p
              style={{
                fontSize: "12px",
                color: "silver",
                padding: "0px 10px",
              }}
            >
              already have an account? &nbsp;
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <span style={{ color: "#50A060", fontWeight: "bold" }}>
                  LOGIN
                </span>
              </Link>
            </p>

            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#50A060",
                padding: "10px 20px",
                outline: "none",
                border: "none",
                borderRadius: "25px",
                fontSize: "18px",
                fontWeight: "bold",
                letterSpacing: "1px",
                display: "flex",
                alignItems: "center",
                color: "white",
                margin: "10px auto",
              }}
              onClick={handleSubmit}
            >
              Sign Up &nbsp;
              <img
                src={signIn}
                alt="Sign In Icon"
                width={25}
                height={25}
                style={{ objectFit: "contain" }}
              />
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default RegisterForm;
