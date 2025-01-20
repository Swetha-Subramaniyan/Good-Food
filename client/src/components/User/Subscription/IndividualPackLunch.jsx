

// import React from 'react';
// import './IndividualPack.css';
// import { IoSunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from '../Home/StarRatings';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const IndividualPackLunch = () => {

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
//     <div> 1 Day - ₹100</div> 
//     <div> 15 Days - ₹90 </div>
//     <div> 30 Days - ₹80 </div>
//   </div>

//     <div className='break'> 
            
//             <div className='breakfast-outt'> <IoSunnyOutline /><span className='fastt'> Lunch </span>   Order before 3:00AM  </div>
            
//   </div>

//   <div className='photo'> 
//   <div> 
//     <img src={idly} alt='idly'/><br/> 
//     <h4> Idly+chutney+sambar <br/> <StarRatings/></h4>
//     <div className='add'> 
//     <button > Add </button> </div> 
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h4> Rice + Chicken gravy <br/>  <StarRatings/></h4>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>
//   <div> 
//     <img src={biriyani} alt='dosa'/><br/> 
//     <h4> Chicken Biriyani <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={pongal} alt='dosa'/><br/> 
//     <h4> Pongal+sambar+vada <br/>  <StarRatings/></h4>
//     <div className='add'> 
//     <button> Add</button>  </div> 
//   </div>
//   <div> 
//     <img src={rice} alt='idly'/><br/> 
//     <h4>Rice + Chicken gravy <br/>  <StarRatings/></h4>
//     <div className='add'> 
//    <button  > Add </button> </div> 
//   </div>

//   <div> 
//     <img src={chappathi} alt='idly'/><br/> 
//     <h4> Chappathi  <br/>  <StarRatings /></h4>
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

// export default IndividualPackLunch


















// import React, { useState } from 'react';
// import './IndividualPackLunch.css';
// import { IoSunnyOutline } from "react-icons/io5";
// import idly from '../../../assets/idly.jpg'
// import rice from '../../../assets/Rice.jpg'
// import biriyani from '../../../assets/biriya.jpg'
// import chappathi from '../../../assets/chappathi.jpg'
// import pongal from '../../../assets/pongal.jpg'
// import StarRatings from '../Home/StarRatings';
// import { Link } from 'react-router-dom';

// const IndividualPackLunch = () => {

//   const [addedItems, setAddedItems] = useState({
//     idly: 0,
//     pongal: 0,
//     rice: 0,
//     biriyani: 0,
//     chappathi: 0,
//   });


//   const handleQuantityChange = (item, operation) => {
//     setAddedItems((prevState) => {
//       const newQuantity = operation === 'increment'
//         ? prevState[item] + 1
//         : prevState[item] > 0 ? prevState[item] - 1 : 0; 
//       return { ...prevState, [item]: newQuantity };
//     });
//   };

//   return (
//     <> 
//       <div className='backgrd'> 
//         <Link to={'/user/Payment'}> 
//           <div className='sub-add'>
//             <button> SUBSCRIBE</button>
//           </div>
//         </Link>
//         <div className='listt'>Choose your Subscription Plans </div>
//         <br /><br />
      
//         <div className='days'> 
//           <div> 1 Day - ₹100</div> 
//           <div> 15 Days - ₹90 </div>
//           <div> 30 Days - ₹80 </div>
//         </div>

//         <div className='break'> 
//           <div className='breakfast-outt'>
//             <IoSunnyOutline />
//             <span className='fastt'> Lunch </span>
//             Order before 3:00AM
//           </div>
//         </div>

//         <div className='photo'> 
         
//           {[
//             { name: 'idly', image: idly, description: 'Idly + chutney + sambar' },
//             { name: 'pongal', image: pongal, description: 'Pongal + sambar + vada' },
//             { name: 'rice', image: rice, description: 'Rice + Chicken gravy' },
//             { name: 'biriyani', image: biriyani, description: 'Chicken Biriyani' },
//             { name: 'chappathi', image: chappathi, description: 'Chappathi' }
//           ].map((item) => (
//             <div key={item.name}>
//               <img src={item.image} alt={item.name} /><br />
//               <h6>{item.description} <br /> <StarRatings /></h6>

//               <div className='add'>
//                 {addedItems[item.name] > 0 ? (
//                   <div className="quantity-container">
//                     <button 
//                       onClick={() => handleQuantityChange(item.name, 'decrement')}
//                       aria-label={`Decrease quantity of ${item.name}`}
//                     >
//                       -
//                     </button>
//                     <span>{addedItems[item.name]}</span>
//                     <button 
//                       onClick={() => handleQuantityChange(item.name, 'increment')}
//                       aria-label={`Increase quantity of ${item.name}`}
//                     >
//                       +
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     onClick={() => handleQuantityChange(item.name, 'increment')}
//                     aria-label={`Add ${item.name}`}
//                   >
//                     Add
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default IndividualPackLunch;
















import React, { useState,useEffect } from 'react';
import './IndividualPackLunch.css';
import { IoSunnyOutline } from "react-icons/io5";
import idly from '../../../assets/idly.jpg'
import rice from '../../../assets/Rice.jpg'
import biriyani from '../../../assets/biriya.jpg'
import chappathi from '../../../assets/chappathi.jpg'
import pongal from '../../../assets/pongal.jpg'
import StarRatings from '../Home/StarRatings';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa6";
 
 
const IndividualPackLunch = () => {
 

  const [plans, setPlans] = useState([]);
  const [addedItems, setAddedItems] = useState({});
 
  const [loading, setLoading] = useState(true);


  const [isSignedIn, setIsSignedIn] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  
  const handleSignIn = () => {
    setIsSignedIn(true); 
    setShowModal(false);
    navigate('/user/Payment');
    
  };

  const onClose = () => {
    setShowModal(false);
  }; 
 
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
          headers: { Authorization: `Bearer ${token}` },
        });
 
        const plansData = response.data.groupedSubscriptions?.['Individual Budget']?.Lunch || [];
        setPlans(plansData);
        setLoading(false);
        console.log("Response : " , response.data)
      } catch (error) {
        console.error('Error fetching subscription plans:', error.response?.data || error.message);
        setPlans([]);
        setLoading(false);
      }
    };
 
    fetchPlans();
  }, []);
 
  const handleQuantityChange = (item, operation) => {
    setAddedItems((prevState) => {
      const newQuantity = operation === 'increment'
        ? prevState[item] + 1
        : prevState[item] > 0 ? prevState[item] - 1 : 0;
      return { ...prevState, [item]: newQuantity };
    });
  };

  const handleSubscribe = () => {
    if (!isSignedIn) {
      setShowModal(true);
      return;
    }
    navigate('/user/Payment');
  };
 
  return (
    <>
      <div className='backgrd'>
        {/* <Link to={'/user/Payment'}>
          <div className='sub-add'>
            <button onClick={handleSubscribe}>SUBSCRIBE</button>
          </div>         
        </Link> */}
        <div className='sub-add'>
          <button onClick={handleSubscribe}>SUBSCRIBE</button>
        </div>
        <div className='listt'>Choose your Subscription Plans </div>
        <br /><br />
     
        <div className='days'>
          {loading ? (
            <div>Loading plans...</div>
          ) : (
            plans.length > 0 ? (
              plans.map((plan, index) => (
                <div key={index} className="plan-card">
                  {plan.days} Day = ₹{plan.price}
                </div>
              ))
            ) : (
              <div>No plans available</div>
            )
          )}
        </div>
 
        <div className='break'>
          <div className='breakfast-outt'>
            <IoSunnyOutline />
            <span className='fastt'> Lunch </span>
            Order before 3:00AM
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

      {showModal && (
        <div className="modaal-overlay">
          <div className="modaal">
          <button className="close-btnn" onClick={onClose}>X</button>
            <h3  className="sign-in-subscribe "style={{marginTop:'1rem'}}>Please Sign In to Subscribe</h3>
            <button onClick={handleSignIn} className="sign-inn-btn">  <FaGoogle />   Sign In with Google   </button>
          </div>
        </div>
      )}
    </>
  );
};
 
export default IndividualPackLunch;