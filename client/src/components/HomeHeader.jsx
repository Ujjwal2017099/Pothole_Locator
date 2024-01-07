import React from 'react'
import municipalImg from '../assets/bmc.png'
import './style.css'

const HomeHeader = () => {
  return (
      <div style={{position:'relative'}}>
          <img className="wd-100" src={municipalImg} alt="" />
          <h1 className='text-white text-overlay'>
              Welcome to pothole locator Website. Here, you can view images and
              location of potholes within your city, helping us maintain safe
              and efficient roads for our community.
          </h1>
      </div>
  );
}

export default HomeHeader