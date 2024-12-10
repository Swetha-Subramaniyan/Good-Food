import React from 'react'
import './LoginPopup.css'
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  return (
    <> 
    <div className='pop'> 
         <button className="close-btn" onClick={onClose}>
          <FaTimes /> 
        </button>
        <h2 className='login'> Sign In</h2>
        <div> 
        <label> Name </label> 
        <input placeholder='Dhanusha'/> </div>
        <br></br>
        <div>
        <label> Phone Number </label>
        <input placeholder='dhanusharavikannan21@gmail.com'/> </div>
        <Link to={'/user/Subscription'}> 
        <button className='submit-btn'> Submit </button> 
        </Link>
        
     </div>
    </>
  )
}

export default LoginPopup