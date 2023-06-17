import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    (async function(){
      const token = localStorage.getItem('Token')
      await axios.get("http://localhost:8080/protected", {headers: {"Authorization" : `Bearer ${token}`}})
    })
  }, [])
  
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
};

export default Home;
