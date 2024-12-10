import React from 'react';
import './Footer.css';
import { FaHome } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <> 
<div className='footer'> 
    <div> <FaHome size={25} />Home </div> 
    <Link to={'/user/SubscriptionCalender'}> 
    <div> <FaListAlt />Subscription</div> </Link>
    <Link to={'/user/Order'}> 
    <div > <FaCalendarAlt />Order</div> </Link> 
    <Link to={'/user/Account'}> 
    <div> <FaCircleUser /> Account</div> </Link>
</div>  
    </>
  )
}

export default Footer
