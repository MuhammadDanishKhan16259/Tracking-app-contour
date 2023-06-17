import "./home.css";
import Navbar from "../../components/common/Navbar";
import Layoutcarousel from "./Layoutcarousel";
import Brochure from "./Brochure";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="bg-mainBgColor">
        <Navbar />
        <Layoutcarousel />
        <div className="">
          <div className="tag-one">
            <div className="tag-title">TRACK ACTIVITIES, BOOST PERFORMANCE</div>
          </div>
          <div className="tag-two">
            <div className="tag-title">
              RIDING ,HIKING ,WALKING SWIMING ,BICYCLING
            </div>
          </div>
        </div>
        <br />
        <Brochure />
        <Footer /> 
      </div>
    </>
  );
};

export default Home;
