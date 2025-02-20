

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IndividualPackDinnerBudget.css';
import { IoPartlySunnyOutline } from "react-icons/io5";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from '../Home/StarRatings';
import SignIn from '../OverallHome/SignIn';
import {useNavigate } from 'react-router-dom';



const IndividualPackDinnerBudget = () => {
  
   const [error, setError] = useState('');
    const [plans, setPlans] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [isSignInVisible, setIsSignInVisible] = useState(false); 
  
    const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
        );
        const dinnerData = response.data.groupedSubscriptions["Individual Plan Budget"]["Dinner"];
        setPlans(dinnerData);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching subscription plans:', error.response?.data || error.message);
        setPlans([]);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanClick = async (planId) => {
    setSelectedPlanId(planId);
    setFoodItems([]); 
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodMenu/getWithID`,
        { subscription_id: planId },
        
      );
      console.log('Food Items fetched:', response.data);
  
      const fetchedItems = response.data.menuWithID?.map((item) => item.FoodItems) || [];
      setFoodItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching food items:', error.response?.data || error.message);
      setFoodItems([]);
      setError('Failed to fetch food items. Please try again.');
    }
  };

  // const handleSubscribe = async () => {
  //   if (!selectedPlanId) {
  //     alert('Please select a plan first.');
  //     return;
  //   }

  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     setIsSignInVisible(true); 
  //     return;
  //   }
  //   navigate(`/user/Payment/${selectedPlanId}`);


   
  // };

  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      alert('Please select a plan first.');
      return;
    }
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Store selectedPlanId in localStorage before showing SignIn popup
      localStorage.setItem('pendingSubscription', selectedPlanId);
      setIsSignInVisible(true); 
      return;
    }
  
    navigate(`/user/Payment/${selectedPlanId}`);
  };

  const handleCloseSignIn=()=>{
    setIsSignInVisible(false)
  }


  return (
  <> 
    <div className='backgrd'> 
    <div className="listt"> 
      <h2> Choose Your Subscription Plans </h2>
      </div>

    <div className="sub-add">
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
    {error && <div className="error">{error}</div>}
    <div className="days">
      {loading ? (
        <div>Loading...</div>
      ) : (
        plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-item ${selectedPlanId === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanClick(plan.id)}

          >
            <div>{plan.days} Days - ₹{plan.price}</div>
          </div>
        ))
      )}
    </div>
    {isSignInVisible && <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />}

    {foodItems.length > 0 && (
<div className="food-items">
  <h2>Food Items for Selected Plan:</h2>
  <ul>
  {foodItems.length > 0 && (

  <ul>
    {foodItems.map((item) => (
      <li key={item.id}>{item.item_name}</li> 
    ))}
  </ul>
)}
  </ul>
</div>
)}

      <div className='break'> 
        <div className='breakfast-outt'>
          <IoPartlySunnyOutline />
          <span className='fastt'> Breakfast </span>Order before 11:00AM
        </div>
      </div>

      <div className='photo'>
        {[{ name: 'idly', image: idly, description: 'Idly+chutney+sambar', day: 'Monday' },
          { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Tuesday' },
          { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Wednesday' },
          { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', day: 'Thursday' },
          { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Friday' },
          { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Saturday' },
          { name: 'chappathi', image: chappathi, description: 'Chappathi', day: 'Sunday' }
        ].map((item) => (
          <div key={item.name}>
            <div className='days-align'>{item.day}</div>
            <br />
            <img src={item.image} alt={item.name} />
            <br />
            <h6>{item.description} <br /><StarRatings /></h6>
          </div>
        ))}
      </div>
    </div>
  </>
);
};

export default IndividualPackDinnerBudget;
