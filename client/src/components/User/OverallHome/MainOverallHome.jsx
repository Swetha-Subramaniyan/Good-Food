
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './MainOverallHome.css';
import logo from '../../../assets/Foodlogo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionPlan from './SubscriptionPlan';
import ContactUs from './ContactUs';
import LicenseContent from './LicenseContent';
import IdeasToImprove from './IdeasToImprove';
import Vision from './Vision';

 
const MainOverallHome = () => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); 
  const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
 
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
       
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
        });
console.log("Response :" , response.data)
        setGroupedSubscriptions(response.data.groupedSubscriptions);
      } catch (error) {
        console.error("Error fetching subscriptions:", error.response?.data || error.message);
      }
    };
 
    fetchSubscriptions();
  }, []);
  
 
  const showFeedbackForm = () => {  
    setIsFeedbackVisible(true);
  };
 
  const closeFeedbackForm = () => {
    setIsFeedbackVisible(false);
  };
 
  return (
    <>   
    <div className='food'> 
         <nav className="navbar navbar-expand-lg navbar-light " >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plans-section">Individual Plan</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#planss-section">Combo Budget</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#plansss-section">Combo Elite</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact-section">Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={showFeedbackForm}>Ideas to Improve!</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
<div className='logo-pic'>
  <img className='header-img' src={logo} alt='food'  />
</div>      
        < LicenseContent /> 
        < Vision/> 
        </div>
        < SubscriptionPlan />
        < ContactUs />         
        <IdeasToImprove isVisible={isFeedbackVisible} onClose={closeFeedbackForm} />
       
<br/> <br/> 
    </>
  );
};
 
export default MainOverallHome;