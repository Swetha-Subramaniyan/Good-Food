

// import React from 'react';
// import './IndividualPackDinner.css';
// import { MdOutlineModeNight } from "react-icons/md";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from '../Home/StarRatings';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';


// const IndividualPackDinner = () => {

//   const [addedItems, setAddedItems] = useState({
//     idly: false,
//     pongal: false,
//     rice: false,
//     biriyani: false,
//     chappathi: false,
//   });


//   const handleAddClick = (item) => {
//     setAddedItems(prevState => ({
//       ...prevState,
//       [item]: !prevState[item], 
//     }));
//   };

//   return (
//     <> 
//     <div className='backgrd'> 
//     <Link to={'/user/Payment'}> 
//   <div className='sub-add'> <button> SUBSCRIBE</button></div></Link>
//     <div className='listt'>Choose your Subscription Plans </div>
//     <br/><br/>
  
//   <div className='days'> 
//     <div> 1 Day - ₹75</div> 
//     <div> 15 Days - ₹68 </div>
//     <div> 30 Days - ₹60 </div>

//   </div>




//     <div className='break'>      
//           <div className='breakfast-outt'>  <MdOutlineModeNight /> <span className='fastt'> Dinner </span> Order before 7:00PM </div> 
//   </div>

//   <div className='photo'> 
//   <div> 
//     <img src={idly} alt='idly'/><br/> 
//     <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
//     <div className='add'> 
//     <button > Add </button> </div> 
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>
//   <div> 
//     <img src={biriyani} alt='dosa'/><br/> 
//     <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>

//   <div> 
//     <img src={chappathi} alt='idly'/><br/> 
//     <h6> Chappathi  <br/>  <StarRatings /></h6>
//     <div className='add'> 
//     <button onClick={() => handleAddClick('chappathi')}> 
//               {addedItems.chappathi ? 'Added' : 'Add'} 
//               {addedItems.chappathi && '+'} 
//             </button>
//      </div> 
//     </div>
//     </div>
//     </div>
//     </>
//   )
// }

// export default IndividualPackDinner




















// import axios from 'axios';
// import React from 'react';
// import './IndividualPackDinnerBudget.css';
// import { MdOutlineModeNight } from "react-icons/md";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from '../Home/StarRatings';
// import { useState,useEffect } from 'react';
// import { Link, useNavigate  } from 'react-router-dom';
// import { FaGoogle } from "react-icons/fa6";
 
 
// const IndividualPackDinnerBudget = () => {
 
//   const [plans, setPlans] = useState([]);
//   const [addedItems, setAddedItems] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isSignedIn, setIsSignedIn] = useState(false); 
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
 
//         const plansData = response.data.groupedSubscriptions?.['Individual Budget']?.Dinner || [];
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
 
//   const handleAddClick = (item) => {
//     setAddedItems(prevState => ({
//       ...prevState,
//       [item]: !prevState[item],
//     }));
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
 
//   return (
//     <>
//     <div className='backgrd'>
//     {/* <Link to={'/user/Payment'}>
//   <div className='sub-add'> <button> SUBSCRIBE</button></div></Link> */}

// <div className='sub-add'>
//           <button onClick={handleSubscribe}>SUBSCRIBE</button>
//         </div>
//     <div className='listt'>Choose your Subscription Plans </div>
//     <br/><br/>
 
// <div className='days'>
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
//   <div className='break'>   
//             <div className='breakfast-outt'>  <MdOutlineModeNight /> <span className='fastt'> Dinner </span> Order before 7:00PM </div>
//   </div>
 
//   <div className='photo'>
//   <div>
//     <img src={idly} alt='idly'/><br/>
//     <h6> Idly+chutney+sambar <br/> <StarRatings/></h6>
  
//   </div>
//   <div>
//     <img src={pongal} alt='dosa'/><br/>
//     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
   
//   </div>
//   <div>
//     <img src={rice} alt='idly'/><br/>
//     <h6> Rice + Chicken gravy <br/>  <StarRatings/></h6>
   
//   </div>
//   <div>
//     <img src={biriyani} alt='dosa'/><br/>
//     <h6> Chicken Biriyani <br/>  <StarRatings/></h6>
    
//   </div>
//   <div>
//     <img src={pongal} alt='dosa'/><br/>
//     <h6> Pongal+sambar+vada <br/>  <StarRatings/></h6>
   
//   </div>
//   <div>
//     <img src={rice} alt='idly'/><br/>
//     <h6>Rice + Chicken gravy <br/>  <StarRatings/></h6>  
//   </div>

//   <div>
//     <img src={chappathi} alt='idly'/><br/>
//     <h6> Chappathi  <br/>  <StarRatings /></h6>   
//     </div>
//     </div>
//     </div>

//     {showModal && (
//         <div className="modaal-overlay">
//           <div className="modaal">
//           <button className="close-btnn" onClick={onClose}>X</button>
//             <h3  className="sign-in-subscribe "style={{marginTop:'1rem'}}>Please Sign In to Subscribe</h3>
//             <button onClick={handleSignIn} className="sign-inn-btn">  <FaGoogle />   Sign In with Google   </button>
//           </div>
//         </div>
//       )}
      
//     </>
//   )
// }
 
// export default IndividualPackDinnerBudget





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
