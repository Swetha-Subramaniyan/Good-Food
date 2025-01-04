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
    <div onClick={handlePopup}> Sign In  </div>
    </div>
    {showPopup && <LoginPopup onClose={handleClosePopup} />}
    </div>
   
    </>
  )
}

export default MainLogin