
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










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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
//   const [subscriptionData, setSubscriptionData] = useState([]);
  
  
//   useEffect(() => {
//     const fetchSubscriptionData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const breakfastData = response.data.groupedSubscriptions["Individual Plan Budget"]["Breakfast"];
//         setSubscriptionData(breakfastData);
//       } catch (error) {
//         console.error("Error fetching subscription data:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptionData();
//   }, []);

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
//           {subscriptionData.map((plan) => (
//             <div
//               key={plan.id}
//               className={`day-item ${selectedDay === plan.days ? 'selected' : ''}`} 
//               onClick={() => handleDayClick(plan.days)} 
//             >
//               {`${plan.days} Day${plan.days > 1 ? 's' : ''} - ₹${plan.price}`}
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






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './IndividualPackBreakfastBudget.css';
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import idly from '../../../assets/idly.jpg';
// import rice from '../../../assets/Rice.jpg';
// import biriyani from '../../../assets/biriya.jpg';
// import chappathi from '../../../assets/chappathi.jpg';
// import pongal from '../../../assets/pongal.jpg';
// import StarRatings from '../Home/StarRatings';

// const IndividualPackBreakfastBudget = () => {
//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [subscriptionData, setSubscriptionData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSubscriptionData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const breakfastData = response.data.groupedSubscriptions["Individual Plan Budget"]["Breakfast"];
//         setSubscriptionData(breakfastData);
//       } catch (error) {
//         console.error("Error fetching subscription data:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptionData();
//   }, []);

//   const handlePlanSelect = (plan) => {
//     setSelectedPlan(prevSelected => (prevSelected?.id === plan.id ? null : plan));
//   };

//   const handleSubscribe = () => {
//     if (!selectedPlan) {
//       alert("Please select a subscription plan before subscribing.");
//       return;
//     }

//     alert("Subscription created successfully!");

//     // Navigate to Payment page with selected plan and items
//     navigate('/user/Payment', {
//       state: { selectedPlan, addedItems }
//     });
//   };

//   return (
//     <> 
//       <div className='backgrd'> 
//         <div className='sub-add'>
//           <button onClick={handleSubscribe}>SUBSCRIBE</button>
//         </div>

//         <div className='listt'>Choose your Subscription Plans</div>
//         <br/><br/>

//         <div className='days'>
//           {subscriptionData.map((plan) => (
//             <div
//               key={plan.id}
//               className={`day-item ${selectedPlan?.id === plan.id ? 'selected' : ''}`} 
//               onClick={() => handlePlanSelect(plan)}
//             >
//               {`${plan.days} Day${plan.days > 1 ? 's' : ''} - ₹${plan.price}`}
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









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './IndividualPackBreakfastBudget.css';
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg';
// import rice from '../../../assets/Rice.jpg';
// import biriyani from '../../../assets/biriya.jpg';
// import chappathi from '../../../assets/chappathi.jpg';
// import pongal from '../../../assets/pongal.jpg';
// import StarRatings from '../Home/StarRatings';
// import { Link, useNavigate } from 'react-router-dom';

// const IndividualPackBreakfastBudget = () => {
//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });
//   const [selectedDay, setSelectedDay] = useState('');
//   const [subscriptionData, setSubscriptionData] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const fetchSubscriptionData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const breakfastData = response.data.groupedSubscriptions["Individual Plan Budget"]["Breakfast"];
//         setSubscriptionData(breakfastData);
//       } catch (error) {
//         console.error("Error fetching subscription data:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptionData();
//   }, []);

//   const handleDayClick = (plan) => {
//     setSelectedDay(prevSelectedDay => (prevSelectedDay === plan.days ? '' : plan.days)); 
//     setSelectedPlan(plan);
//   };

//   const handleSubscribe = () => {
//     if (selectedPlan) {
//       alert("Subscription created successfully!");
//       navigate('/user/Payment', { state: { selectedPlan } });
//     } else {
//       alert("Please select a subscription plan first.");
//     }
//   };
  

//   return (
//     <> 
//       <div className='backgrd'> 
//         <div className='sub-add'>
//           <button onClick={handleSubscribe}>SUBSCRIBE</button>
//         </div>

//         <div className='listt'>Choose your Subscription Plans</div>
//         <br/><br/>

//         <div className='days'>
//           {subscriptionData.map((plan) => (
//             <div
//               key={plan.id}
//               className={`day-item ${selectedDay === plan.days ? 'selected' : ''}`} 
//               onClick={() => handleDayClick(plan)} 
//             >
//               {`${plan.days} Day${plan.days > 1 ? 's' : ''} - ₹${plan.price}`}
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

  
import {useNavigate } from 'react-router-dom';

const IndividualPackBreakfastBudget = () => {
  const [error, setError] = useState('');
  const [plans, setPlans] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPlans = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const BudgetData = response.data.groupedSubscriptions["Individual Plan Budget"]["Breakfast"];
          setPlans(BudgetData);
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
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodMenu/getWithID`,
          { subscription_id: planId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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

  const handleSubscribe = async () => {
      if (!selectedPlanId) {
        alert('Please select a plan first.');
        return;
      }
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/createUserSubscription`,
          { subscription_id: selectedPlanId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  console.log("Subscription Created:",response.data)
        alert('Subscription successfully created.');
        navigate('/user/Payment');
      } catch (err) {
        console.error('Error creating subscription:', err);
        setError('Failed to create subscription. Please try again.');
      }
    };

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

export default IndividualPackBreakfastBudget;
