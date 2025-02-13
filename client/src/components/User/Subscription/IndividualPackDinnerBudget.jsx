

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
import { Link } from 'react-router-dom';

const IndividualPackDinnerBudget = () => {
  const [addedItems, setAddedItems] = useState({
    idly: 0,
    pongal: 0,
    rice: 0,
    biriyani: 0,
    chappathi: 0,
  });
  const [selectedDay, setSelectedDay] = useState('');
  const [subscriptionData, setSubscriptionData] = useState([]);
  
  // Fetch dinner subscription data on component mount
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const dinnerData = response.data.groupedSubscriptions["Individual Plan Budget"]["Dinner"];
        setSubscriptionData(dinnerData);
      } catch (error) {
        console.error("Error fetching subscription data:", error.response?.data || error.message);
      }
    };

    fetchSubscriptionData();
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(prevSelectedDay => (prevSelectedDay === day ? '' : day)); 
  };

  const handleQuantityChange = (item, operation) => {
    setAddedItems(prevState => {
      const newQuantity = operation === 'increment' 
        ? prevState[item] + 1 
        : (prevState[item] > 0 ? prevState[item] - 1 : 0);
      return { ...prevState, [item]: newQuantity };
    });
  };

  return (
    <> 
      <div className='backgrd'> 

      <div className="listt"> 
      <h2> Choose Your Subscription Plans </h2>
      </div>

        <Link to={'/user/Payment'}> 
          <div className='sub-add'>
            <button>SUBSCRIBE</button>
          </div>
        </Link>
  
        <div className='days'>
          {subscriptionData.map((plan) => (
            <div
              key={plan.id}
              className={`day-item ${selectedDay === plan.days ? 'selected' : ''}`} 
              onClick={() => handleDayClick(plan.days)} 
            >
              {`${plan.days} Day${plan.days > 1 ? 's' : ''} - ₹${plan.price}`}
            </div>
          ))}
        </div>

        <div className='break'> 
          <div className='breakfast-outt'>
            <IoPartlySunnyOutline />
            <span className='fastt'> Dinner </span>Order before 11:00PM
          </div>
        </div>

        <div className='photo'>
          {/* You can adjust the meal items for Dinner here */}
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
