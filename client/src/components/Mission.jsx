import React from 'react'
import './style.css'
import construct from '../assets/construct.png'

const Mission = () => {
  return (
      <div className='d-flex a-center j-center mission-parent'>
          <div className="d-flex">
              <img src={construct} className='mission-img' alt="" />
              <div className='d-flex flex-direction a-center mission'>
                  <h2>Our Mission</h2>
                  <p style={{fontSize:'20px'}}>
                      We are dedicated to ensuring the safety and functionality
                      of our city's roads. Our goal is to provide reliable
                      infrastructure for all residents.
                  </p>
              </div>
          </div>
      </div>
  );
}

export default Mission