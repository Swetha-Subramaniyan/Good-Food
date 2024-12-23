import React, {useState} from 'react'
import './MainLogin.css'
import LoginPopup from './LoginPopup';
import { Link, useNavigate } from 'react-router-dom';


const MainLogin = () => {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate()

  const handlePopup = () => {
    navigate ('/user/LoginPopup')
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

return (
    <>  
    <Link to={'/admin/addsubscription'}> 
    <button> ADMIN</button> </Link> 
    <div className='background'> 
    <div className='sign-in'> 
    {/* <Link to={'/user/LoginPopup'}>  */}
    <h2 onClick={handlePopup}> Sign In  </h2>
    {/* </Link> */}
    <h2> To Explore </h2>  
    </div>
    {showPopup && <LoginPopup onClose={handleClosePopup} />}
    </div>
   
    </>
  )
}

export default MainLogin