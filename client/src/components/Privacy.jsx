import React from 'react'
import './style.css'

const Privacy = () => {
  return (
      <div className='privacy-parent' style={{ backgroundColor: "#201d3c" }}>
          <h1 style={{ color: "#c6bfee" , marginBottom : '35px' , marginLeft : '40px'}}>Privacy Policy</h1>
          <table style={{ color: "#c6bfee" , fontSize : '20px'}}>
              <tbody>
                  <tr>
                      <td className='td'>Data Protection</td>
                      <td>
                          Ensuring user privacy, our app employs robust
                          encryption and strictly adheres to data protection
                          standards, safeguarding personal location information
                          with utmost confidentiality
                      </td>
                  </tr>
                  <tr>
                      <td className='td'>Security Measures</td>
                      <td>
                          Implement secure data encryption for user location
                          information and incorporate strict access controls to
                          ensure only authorized users can retrieve or modify
                          location data
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  );
}

export default Privacy