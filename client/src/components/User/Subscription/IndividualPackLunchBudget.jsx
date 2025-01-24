
// import React, { useState,useEffect } from 'react';
// import './IndividualPackLunchBudget.css';
// import { IoSunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from '../Home/StarRatings';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaGoogle } from "react-icons/fa6";
 
 
// const IndividualPackLunchBudget = () => {
 

//   const [plans, setPlans] = useState([]);
//   const [addedItems, setAddedItems] = useState({});
 
//   const [loading, setLoading] = useState(true);


//   const [isSignedIn, setIsSignedIn] = useState(false); 
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

  
//   const handleSignIn = () => {
//     setIsSignedIn(true); 
//     setShowModal(false);
//     navigate('/user/Payment');
    
//   };

//   const onClose = () => {
//     setShowModal(false);
//   }; 
 
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
 
//         const plansData = response.data.groupedSubscriptions?.['Individual Budget']?.Lunch || [];
//         setPlans(plansData);
//         setLoading(false);
//         console.log("Response : " , response.data)
//       } catch (error) {
//         console.error('Error fetching subscription plans:', error.response?.data || error.message);
//         setPlans([]);
//         setLoading(false);
//       }
//     };
 
//     fetchPlans();
//   }, []);
 
//   const handleQuantityChange = (item, operation) => {
//     setAddedItems((prevState) => {
//       const newQuantity = operation === 'increment'
//         ? prevState[item] + 1
//         : prevState[item] > 0 ? prevState[item] - 1 : 0;
//       return { ...prevState, [item]: newQuantity };
//     });
//   };

//   const handleSubscribe = () => {
//     if (!isSignedIn) {
//       setShowModal(true);
//       return;
//     }
//     navigate('/user/Payment');
//   };
 
//   return (
//     <>
//       <div className='backgrd'>
//         {/* <Link to={'/user/Payment'}>
//           <div className='sub-add'>
//             <button onClick={handleSubscribe}>SUBSCRIBE</button>
//           </div>         
//         </Link> */}
//         <div className='sub-add'>
//           <button onClick={handleSubscribe}>SUBSCRIBE</button>
//         </div>
//         <div className='listt'>Choose your Subscription Plans </div>
//         <br /><br />
     
//         <div className='days'>
//           {loading ? (
//             <div>Loading plans...</div>
//           ) : (
//             plans.length > 0 ? (
//               plans.map((plan, index) => (
//                 <div key={index} className="plan-card">
//                   {plan.days} Day = ₹{plan.price}
//                 </div>
//               ))
//             ) : (
//               <div>No plans available</div>
//             )
//           )}
//         </div>
 
//         <div className='break'>
//           <div className='breakfast-outt'>
//             <IoSunnyOutline />
//             <span className='fastt'> Lunch </span>
//             Order before 3:00AM
//           </div>
//         </div>

//         <div className='photo'>
//           {[{ name: 'idly', image: idly, description: 'Idly+chutney+sambar', day: 'Monday' },
//             { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Tuesday' },
//             { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Wednesday' },
//             { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani', day: 'Thursday' },
//             { name: 'pongal', image: pongal, description: 'Pongal+sambar+vada', day: 'Friday' },
//             { name: 'rice', image: rice, description: 'Rice + Chicken gravy', day: 'Saturday' },
//             { name: 'chappathi', image: chappathi, description: 'Chappathi', day: 'Sunday' }
//           ].map((item) => (
//             <div key={item.name}>
//               <div className='days-align'>{item.day}</div>
//               <br />
//               <img src={item.image} alt={item.name} />
//               <br />
//               <h6>{item.description} <br /><StarRatings /></h6>
   
//             </div>
//           ))}
//         </div>
//       </div>

//       {showModal && (
//         <div className="modaal-overlay">
//           <div className="modaal">
//           <button className="close-btnn" onClick={onClose}>X</button>
//             <h3  className="sign-in-subscribe "style={{marginTop:'1rem'}}>Please Sign In to Subscribe</h3>
//             <button onClick={handleSignIn} className="sign-inn-btn">  <FaGoogle />   Sign In with Google   </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
 
// export default IndividualPackLunchBudget;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IndividualPackLunchBudget.css';
import { IoPartlySunnyOutline } from "react-icons/io5";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from '../Home/StarRatings';
import { Link } from 'react-router-dom';

const IndividualPackLunchBudget = () => {
  const [addedItems, setAddedItems] = useState({
    idly: 0,
    pongal: 0,
    rice: 0,
    biriyani: 0,
    chappathi: 0,
  });
  const [selectedDay, setSelectedDay] = useState('');
  const [subscriptionData, setSubscriptionData] = useState([]);
  
  // Fetch lunch subscription data on component mount
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
        const lunchData = response.data.groupedSubscriptions["Individual Plan Budget"]["Lunch"];
        setSubscriptionData(lunchData);
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
        <Link to={'/user/Payment'}> 
          <div className='sub-add'>
            <button>SUBSCRIBE</button>
          </div>
        </Link>
        <div className='listt'>Choose your Subscription Plans</div>
        <br/><br/>

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
            <span className='fastt'> Lunch </span>Order before 11:00AM
          </div>
        </div>

        <div className='photo'>
          {/* You can adjust the meal items for Lunch here */}
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

export default IndividualPackLunchBudget;

