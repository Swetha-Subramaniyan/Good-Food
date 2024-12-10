
import React from 'react';
import { SlBasketLoaded } from "react-icons/sl";
import './MainNavbar.css'
import { IoPersonCircleOutline } from "react-icons/io5";


const MainNavbar = () => {
  return (
    <> 
    <div className='home-header'> 
    <div> Profile <IoPersonCircleOutline size={30} /> </div>  
    <div> Cart <SlBasketLoaded size={30}  />  </div>
    </div>
    
    </>
   
  )
}

export default MainNavbar