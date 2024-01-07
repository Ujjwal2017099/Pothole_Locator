import React from "react";
import "./style.css";
import HomeHeader from "../components/HomeHeader";
import Mission from "../components/Mission";
import pothole from "../assets/pothole.png";
import { Link } from "react-router-dom";
import Privacy from "../components/Privacy";

const Home = () => {
    return (
        <div>
            <HomeHeader />
            <Mission />
            <div>
                <img style={{width:'100%'}} src={pothole} alt="" />
                <Link to='/search' className="overlay">Click here to view</Link>
            </div>
            <Privacy/>
        </div>
    );
};

export default Home;
