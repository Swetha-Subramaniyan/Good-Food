
// import React, { useState } from 'react';
// import './MainSubscription.css';
// import { Link, useNavigate } from 'react-router-dom';

// const MainSubscription = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleIndividual = () => {
//     setIsModalOpen(true); 
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); 
//   };

//   const handleCost =()=>{
//     navigate('/user/individualPackBreakfast')
//   }

//   const handleCostLunch =()=>{
//     navigate('/user/individualPackLunch')
//   }

//   const handleCostDinner =()=>{
//     navigate('/user/individualPackDinner')
//   }


//   return (
//     <>

//       <div className="back">
//         <h1 className="heading"> Choose Your Plan for Subscriptions!</h1>
//         <div className="choose-plan">
//           <h2 className="combo">
//             Individual Pack <br />
//             <button onClick={handleIndividual}>View</button>
//           </h2>

//           <h2 className="comboo">
//             Combo Budget Plan <br />
//             <Link to="/user/IndividualPack">
//               <button>View</button>
//             </Link>
//           </h2>
//           <h2 className="combooo">
//             Combo Elite Plan <br />
//             <Link to="/user/IndividualPack">
//               <button>View</button>
//             </Link>
//           </h2>
//         </div>
//       </div> 
  
//     </>
//   );
// };

// export default MainSubscription;
