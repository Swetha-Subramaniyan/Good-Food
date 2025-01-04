import React from 'react'
import './LoginPopup.css'
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate()

  const handleSubmit =() => {
    // navigate ('/user/Subscription')
    navigate ('/user/OverallHome')
   
  }

  const landingPage = () =>{
    navigate ('/user/OverallHome')
  }

  return (
    <> 
    <div className='backgroundd'> 
    <div className='pop'> 
         <button className="close-btn" onClick={onClose}>
          <FaTimes /> 
        </button>
        <h2 onClick={landingPage}  className='login'> Sign In</h2>
        <div> 
        <label> Phone Number </label> 
        <input placeholder='9626528019'/> </div>
        <br></br>
        <div>
        <label> User ID  </label>
        <input placeholder='GF001'/> </div> 
        <button onClick={handleSubmit} className='submit-btn'> Submit </button>       
     </div>
     </div>
    </>
  )
}

export default LoginPopup


