
// import React from 'react';
// import { SlBasketLoaded } from "react-icons/sl";
// import './MainNavbar.css'
// import { IoPersonCircleOutline } from "react-icons/io5";
// import {  useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-regular-svg-icons';
// import { faWallet } from '@fortawesome/free-solid-svg-icons';





// const MainNavbar = () => {
 
//   const navigate =useNavigate();

//   const handleCart=()=>{
//     navigate ('/user/cart')

//   }
//   const handleProfile=()=>{
//     navigate('/user/Account')
//   }
//   return (
//     <> 
//     <div className='home-headerr'> 
    // <div onClick={handleProfile} > <IoPersonCircleOutline size={30} /> Profile  </div> 
    // <div className='wallet'> <FontAwesomeIcon icon={faWallet} /> Wallet </div>
    // <div className='notify'>  <FontAwesomeIcon icon={faBell} /> Notifications </div>

//     <div onClick={handleCart}> <SlBasketLoaded size={30}  /> Cart </div>
//     </div>
    
//     </>
   
//   )
// }

// export default MainNavbar






import React from 'react'
import MainUserSidebar from '../UserSidebar/MainUserSidebar'

const MainNavbar = () => {
  return (
    < MainUserSidebar />

   
  )
}

export default MainNavbar