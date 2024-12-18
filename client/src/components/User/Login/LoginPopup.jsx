import React from 'react'
import './LoginPopup.css'
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate()

  const handleSubmit =() => {
    navigate ('/user/Subscription')
  }
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
        <input placeholder='9626528019'/> </div> 
        <button onClick={handleSubmit} className='submit-btn'> Submit </button> 
       
        
     </div>
    </>
  )
}

export default LoginPopup