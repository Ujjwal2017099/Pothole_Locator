import React from 'react'
import municipalImg from '../assets/bmc.png'
import './style.css'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const HomeHeader = () => {
    // const navigate = useNavigate()
    const loginStyle = {
        borderRadious: "5px",
        padding: "10px 15px",
        color : '#fff',
        textDecoration : 'none',
        position : 'absolute',
        zIndex : '2',
        fontWeight : '700',
    };
  return (
      <div style={{ position: "relative" }}>
          <div style={{marginLeft:'auto',width:'100px'}}>
              <Link style={loginStyle} to="/login">
                  Login
              </Link>
          </div>
          <img className="wd-100" src={municipalImg} alt="" />
          <h1 className="text-white text-overlay">
              Welcome to pothole locator Website. Here, you can view images and
              location of potholes within your city, helping us maintain safe
              and efficient roads for our community.
          </h1>
      </div>
  );
}

export default HomeHeader