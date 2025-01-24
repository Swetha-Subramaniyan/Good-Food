
// import React, { useState, useEffect } from 'react';
// import './IndividualPackBreakfast.css';
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg';
// import rice from '../../../assets/Rice.jpg';
// import biriyani from '../../../assets/biriya.jpg';
// import chappathi from '../../../assets/chappathi.jpg';
// import pongal from '../../../assets/pongal.jpg';
// import StarRatings from '../Home/StarRatings';
// import { useNavigate } from 'react-router-dom';
// import { FaGoogle } from "react-icons/fa6";
// import axios from 'axios';


// const IndividualPackBreakfast = () => {
//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });
//   const [selectedDay, setSelectedDay] = useState('');
//   const [subscriptionPlans, setSubscriptionPlans] = useState([]); // Ensure default is an array
//   const [isSignedIn, setIsSignedIn] = useState(false); 
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSubscriptionPlans = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 console.error("Authorization token not found.");
//                 return;
//             }

//             console.log("Fetching subscription plans...");
//             const response = await axios.get(
//                 `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             console.log("API Response:", response.data);
//             setSubscriptionPlans(response.data.subscriptionPlans || []); 
//         } catch (error) {
//             console.error("Error fetching subscription plans:", error.response?.data || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchSubscriptionPlans();
// }, []);


//   const handleDayClick = (day) => {
//     setSelectedDay(prevSelectedDay => (prevSelectedDay === day ? '' : day));
//   };

//   const handleQuantityChange = (item, operation) => {
//     setAddedItems(prevState => {
//       const newQuantity = operation === 'increment' 
//         ? prevState[item] + 1 
//         : (prevState[item] > 0 ? prevState[item] - 1 : 0);
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

//   const handleSignIn = () => {
//     setIsSignedIn(true); 
//     setShowModal(false);
//     navigate('/user/Payment');
//   };

//   const onClose = () => {
//     setShowModal(false);
//   };

//   if (loading) {
//     return <p>Loading subscription plans...</p>;
//   }

//   return (
//     <> 
//       <div className='backgrd'> 
//         <div className='sub-add'>
//           <button onClick={handleSubscribe}>SUBSCRIBE</button>
//         </div>
//         <div className='listt'>Choose your Subscription Plans</div>
//         <br/><br/>

//         <div className='days'>
//           {subscriptionPlans.length > 0 ? (
//             subscriptionPlans.map((plan, index) => (
//               <div
//                 key={index}
//                 className={`day-item ${selectedDay === plan ? 'selected' : ''}`}
//                 onClick={() => handleDayClick(plan)}
//               >
//                 {plan}
//               </div>
//             ))
//           ) : (
//             <p>No subscription plans available.</p>
//           )}
//         </div>
        
//         <div className='break'> 
//           <div className='breakfast-outt'>
//             <IoPartlySunnyOutline />
//             <span className='fastt'> Breakfast </span>Order before 11:00AM
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
//             <button onClick={handleSignIn} className="sign-inn-btn">  <FaGoogle/>   Sign In with Google   </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default IndividualPackBreakfast;










// import React, { useState } from 'react';
// import './IndividualPackBreakfastBudget.css';
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg';
// import rice from '../../../assets/Rice.jpg';
// import biriyani from '../../../assets/biriya.jpg';
// import chappathi from '../../../assets/chappathi.jpg';
// import pongal from '../../../assets/pongal.jpg';
// import StarRatings from '../Home/StarRatings';
// import { Link } from 'react-router-dom';

// const IndividualPackBreakfastBudget = () => {
//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });

//   const [selectedDay, setSelectedDay] = useState(''); 

//   const handleDayClick = (day) => {
//     setSelectedDay(prevSelectedDay => (prevSelectedDay === day ? '' : day)); 
//   };

//   const handleQuantityChange = (item, operation) => {
//     setAddedItems(prevState => {
//       const newQuantity = operation === 'increment' 
//         ? prevState[item] + 1 
//         : (prevState[item] > 0 ? prevState[item] - 1 : 0);
//       return { ...prevState, [item]: newQuantity };
//     });
//   };

//   return (
//     <> 
//       <div className='backgrd'> 
//         <Link to={'/user/Payment'}> 
//           <div className='sub-add'>
//             <button>SUBSCRIBE</button>
//           </div>
//         </Link>
//         <div className='listt'>Choose your Subscription Plans</div>
//         <br/><br/>

//         <div className='days'>
//           {['1 Day - ₹75', '15 Days - ₹68', '30 Days - ₹60'].map((day, index) => (
//             <div
//               key={index}
//               className={`day-item ${selectedDay === day ? 'selected' : ''}`} 
//               onClick={() => handleDayClick(day)} 
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className='break'> 
//           <div className='breakfast-outt'>
//             <IoPartlySunnyOutline />
//             <span className='fastt'> Breakfast </span>Order before 11:00AM
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
//     </>
//   );
// };

// export default IndividualPackBreakfastBudget;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IndividualPackBreakfastBudget.css';
import { IoPartlySunnyOutline } from "react-icons/io5";
import idly from '../../../assets/idly.jpg';
import rice from '../../../assets/Rice.jpg';
import biriyani from '../../../assets/biriya.jpg';
import chappathi from '../../../assets/chappathi.jpg';
import pongal from '../../../assets/pongal.jpg';
import StarRatings from '../Home/StarRatings';
import { Link } from 'react-router-dom';

const IndividualPackBreakfastBudget = () => {
  const [addedItems, setAddedItems] = useState({
    idly: 0,
    pongal: 0,
    rice: 0,
    biriyani: 0,
    chappathi: 0,
  });
  const [selectedDay, setSelectedDay] = useState('');
  const [subscriptionData, setSubscriptionData] = useState([]);
  
  // Fetch subscription data on component mount
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
        const breakfastData = response.data.groupedSubscriptions["Individual Plan Budget"]["Breakfast"];
        setSubscriptionData(breakfastData);
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

export default IndividualPackBreakfastBudget;





