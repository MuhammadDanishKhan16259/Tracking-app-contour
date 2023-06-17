import React from "react";
import LoginForm from "./LoginForm";
import loginBg from "../assets/loginBg.png";
import Lottie from "lottie-react";
import animationData from "../assets/Befit.json";
import RegisterForm from "./RegisterForm";

const FrontPage = () => {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "60% 1fr",
        height: "100vh",
        margin: "0px",
        padding: "0px",
      }}
    >
      <section
        style={{
          backgroundColor: "#fff",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </section>
      <section
        style={{
          backgroundColor: "#edf5ef",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={loginBg}
          alt="login Bg "
          width={750}
          style={{
            objectFit: "contain",
            position: "absolute",
            bottom: "150px",
            right: "4.1%",
          }}
        />
        <Lottie
          animationData={animationData}
          style={{
            position: "absolute",
            right: "1%",
            bottom: "40px",
            width: "800px",
            height: "800px",
          }}
        />
      </section>

      <hr
        style={{
          color: "#50A060",
          borderBottom: "2px solid #50A060",
          position: "absolute",
          bottom: "150px",
          width: "100%",
        }}
      />
      <hr
        style={{
          color: "#50A060",
          borderBottom: "2px solid #50A060",
          position: "absolute",
          bottom: "145px",
          width: "100%",
        }}
      />
    </main>
  );
};

export default FrontPage;
