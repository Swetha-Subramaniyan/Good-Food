import React, {useState} from 'react'
import './MainLogin.css'
import LoginPopup from './LoginPopup';
import { Link } from 'react-router-dom';

const MainLogin = () => {

  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

return (
    <>  
<Link to={'/admin/AddSubscription'}> 
    <button> ADMIN</button> </Link> 
    <div className='background'> 
    <div className='sign-in'> 
    <h2 onClick={handlePopup}> Sign In  </h2>
    <h2> To Explore </h2>  
    </div>
    {showPopup && <LoginPopup onClose={handleClosePopup} />}
    </div>
   
    </>
  )
}

export default MainLogin