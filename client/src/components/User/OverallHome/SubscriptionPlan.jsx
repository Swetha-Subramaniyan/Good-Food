// import React, {useState} from 'react'
// import './SubscriptionPlan.css'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// const SubscriptionPlan = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleIndividuals = () => {
//         setIsModalOpen(true);
//       };


//       const closeModal = () => {
//         setIsModalOpen(false);
//       };
     
//     //   const handleIndividual = () => {
//     //     setIsModalOpen(true);
//     //   };
     
//      const navigate = useNavigate();

//       const handleCost = () => {
//         navigate('/user/individualPackBreakfast');
//       };
     
//       const handleCostLunch = () => {
//         navigate('/user/individualPackLunch');
//       };
     
//       const handleCostDinner = () => {
//         navigate('/user/individualPackDinner');
//       };

//   return (
//     <> 
    
//     <div id='plans-section'> </div>
//     <div style={{marginTop:'3rem'}}> 
//         <h1 className="home-heading text-center">Choose Your Plan for Subscription!</h1> </div>
//         <div className='plans-head'>
//           <h2 className="comm">
//             Individual Pack <br />
//             <button onClick={handleIndividuals}>View</button>
//           </h2>
//           <div style={{height:'100vh'}} > 
          
//           <div id='planss-section'> 
//           <h2 className="comm">
//             Combo Budget Plan <br />
//             <Link to="/user/BudgetCombo">
//               <button>View</button>
//             </Link>
//           </h2>
//           </div>
//           </div>
//           <div style={{height:'100vh'}} > 
//           <div id='plansss-section'> 
//           <h2 className="comm">
//             Combo Elite Plan <br />
//             <Link to="/user/EliteCombo">
//               <button>View</button>
//             </Link>
//           </h2>
//           </div>  
//         </div>  
//         </div>  


//         {isModalOpen && (
//           <div className="modal">
//             <div className="modal-content">
//               <button className="closee-btn" onClick={closeModal}> X</button>
//               <table className="styled---table">
//                 <thead>
//                   <tr>
//                     <th colSpan={2}> Breakfast</th>
//                     <th colSpan={2}> Lunch</th>
//                     <th colSpan={2}> Dinner</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCost}> Budget </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCost}> Elite  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Budget </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostLunch}> Elite  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Budget  </button>
//                     </td>
//                     <td style={{ backgroundColor: 'rgb(229, 237, 237)' }}>
//                       <button onClick={handleCostDinner}> Elite  </button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//     </>
//   )
// }

// export default SubscriptionPlan


















// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';


// const SubscriptionPlan = () => {

//     const navigate = useNavigate();
//     const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
   
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
   
//     useEffect(() => {
//       const fetchSubscriptions = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             console.error("Authorization token not found.");
//             return;
//           }
   
//           const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//   console.log("Response :" , response.data)
//           setGroupedSubscriptions(response.data.groupedSubscriptions);
//         } catch (error) {
//           console.error("Error fetching subscriptions:", error.response?.data || error.message);
//         }
//       };
   
//       fetchSubscriptions();
//     }, []);
   
//     const handleCardClick = (planName) => {
//       if (planName === 'Individual') {
//         setSelectedPlan(planName);
//         setIsModalOpen(true);
//       } else if (planName === 'Combo Budget') {
//         navigate('/user/BudgetCombo');
//       } else if (planName === 'Combo Elite') {
//         navigate('/user/EliteCombo');
//       }
//     };
   
//     const closeModal = () => {
//       setIsModalOpen(false);
//       setSelectedPlan(null);
//     };
   
   
   
//     const handleIndividuals = () => {
//       setIsModalOpen(true);
//     };
   
   
   
   
//     const showFeedbackForm = () => {
//       setIsFeedbackVisible(true);
//     };
   
//     const closeFeedbackForm = () => {
//       setIsFeedbackVisible(false);
//     };
   
//       const handleIndividualBreakfast = () => {
//       navigate('/user/individualPackBreakfast');
//     };
   
//     const handleIndividualLunch = () => {
//       navigate('/user/individualPackLunch');
//     };
   
//     const handleIndividualDinner = () => {
//       navigate('/user/individualPackDinner');
//     };


//   return (
//     <> 

// <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>
 
//       <div className="plans-grid">
//         <div className="plan-card" onClick={() => handleCardClick('Individual')}>
//           <h3 className="plan-name">Individual</h3>
//         </div>
 
//         <div className="plan-card" onClick={() => handleCardClick('Combo Budget')}>
//           <h3 className="plan-name">Combo Budget</h3>
//         </div>
 
       
//         <div className="plan-card" onClick={() => handleCardClick('Combo Elite')}>
//           <h3 className="plan-name">Combo Elite</h3>
//         </div>
//       </div>
 
//       {isModalOpen && selectedPlan === 'Individual' && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//             <h3 className="modal-heading">Individual Plan</h3>
//             <table className="styled-table">
             
//               <tbody>
//                 <tr>
//                   <th>Budget</th>
//                   <th>Elite</th>
                 
//                 </tr>
//                 <tr>
//                 <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                     <button onClick={handleIndividualBreakfast} >Breakfast</button>
//                    </td>
//                    <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                      <button onClick={handleIndividualBreakfast}>Breakfast</button>
//                    </td>
//                  </tr>
//                  <tr>
//                    <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                      <button onClick={handleIndividualLunch} >Lunch</button>
//                    </td>
//                    <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                      <button onClick={handleIndividualLunch} >Lunch</button>
//                    </td>
//                  </tr>
//                  <tr>
//                    <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                      <button onClick={handleIndividualDinner}>Dinner</button>
//                   </td>
//                    <td style={{ backgroundColor: "rgb(229, 237, 237)" }}>
//                      <button onClick={handleIndividualDinner}>Dinner</button>
//                    </td>
//                  </tr>
               
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
// </div>


//     </>
//   )
// }

// export default SubscriptionPlan

















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setGroupedSubscriptions(response.data.groupedSubscriptions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handleCardClick = (planName) => {
//     if (planName === 'Individual Plan Budget' || planName === 'Individual Plan Elite') {
//       setSelectedPlan(planName);
//       setIsModalOpen(true);
//     } else if (planName === 'Combo Plan Budget') {
//       navigate('/user/BudgetCombo');
//     } else if (planName === 'Combo Plan Elite') {
//       navigate('/user/EliteCombo');
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPlan(null);
//   };

//   if (loading) {
//     return <p>Loading subscription plans...</p>;
//   }

//   return (
//     <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>

//       <div className="plans-grid">
//         {Object.keys(groupedSubscriptions).map((planName) => (
//           <div className="plan-card" key={planName} onClick={() => handleCardClick(planName)}>
//             <h3 className="plan-name">{planName}</h3>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && selectedPlan && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//             <h3 className="modal-heading">{selectedPlan}</h3>
//             <table className="styled-table">
//               <thead>
//               <tr>
//                   <th>Meal</th>
//                   <th>Budget</th>
//                   <th>Elite</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(groupedSubscriptions[selectedPlan]).map(([meal, options]) =>
//                   options.map((option) => (
//                     <tr key={option.id}>
//                       <td> {meal}</td>
//                       <td>{option.days}</td>
//                       <td>{option.price}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
            
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionPlan;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setGroupedSubscriptions(response.data.groupedSubscriptions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handleCardClick = (planName) => {
//     if (planName === 'Individual Plan Budget' || planName === 'Individual Plan Elite') {
//       setSelectedPlan(planName);
//       setIsModalOpen(true);
//     } else if (planName === 'Combo Plan Budget') {
//       navigate('/user/BudgetCombo');
//     } else if (planName === 'Combo Plan Elite') {
//       navigate('/user/EliteCombo');
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPlan(null);
//   };

//   if (loading) {
//     return <p>Loading subscription plans...</p>;
//   }

//   return (
//     <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>

//       <div className="plans-grid">
//         {Object.keys(groupedSubscriptions).map((planName) => (
//           <div className="plan-card" key={planName} onClick={() => handleCardClick(planName)}>
//             <h3 className="plan-name">{planName}</h3>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && selectedPlan && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//             <h3 className="modal-heading">{selectedPlan}</h3>
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th colSpan={2}> Breakfast</th>
//                   <th colSpan={2}> Lunch </th>
//                   <th colSpan={2} > Dinner</th>
//                 </tr>
//               </thead>
//               {/* <tbody>
//                 {Object.entries(groupedSubscriptions[selectedPlan]).map(([meal, options]) =>
//                   options.map((option) => (
//                     <tr key={option.id}>
//                       <td> {meal}</td>
//                       <td>{option.days}</td>
//                       <td>{option.price}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody> */}
//               <tbody> 
//                 <td> Budget</td>
//                 <td> Elite</td>
//                 <td> Budget</td>
//                 <td> Elite</td>
//                 <td> Budget</td>
//                 <td> Elite</td>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionPlan;














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setGroupedSubscriptions(response.data.groupedSubscriptions);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.response?.data || error.message);
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handleMealClick = (mealType) => {
//     navigate(`/user/IndividualPack${mealType}`);
//   };

//   if (loading) {
//     return <p>Loading subscription plans...</p>;
//   }

//   return (
//     <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>

//       <div className="plans-grid">
//         <div className="plan-card" onClick={() => setIsModalOpen(true)}>
//           <h3 className="plan-name">Individual Plan</h3>
//         </div>
//         <div className="plan-card" onClick={() => navigate('/user/BudgetCombo')}>
//           <h3 className="plan-name">Combo Budget Plan</h3>
//         </div>
//         <div className="plan-card" onClick={() => navigate('/user/EliteCombo')}>
//           <h3 className="plan-name">Combo Elite Plan</h3>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="closee-btn" onClick={() => setIsModalOpen(false)}>X</button>
//             <h3 className="modal-heading">Individual Plan</h3>
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>Meal</th>
//                   <th>Breakfast</th>
//                   <th>Lunch</th>
//                   <th>Dinner</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Budget</td>
//                   <td onClick={() => handleMealClick('Breakfast')}>View</td>
//                   <td onClick={() => handleMealClick('Lunch')}>View</td>
//                   <td onClick={() => handleMealClick('Dinner')}>View</td>
//                 </tr>
//                 <tr>
//                   <td>Elite</td>
//                   <td onClick={() => handleMealClick('Breakfast')}>View</td>
//                   <td onClick={() => handleMealClick('Lunch')}>View</td>
//                   <td onClick={() => handleMealClick('Dinner')}>View</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionPlan;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "./MainOverallHome.css";
// import './SubscriptionPlan.css'
// import { useNavigate } from "react-router-dom";
 
// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
//   const [filteredPlans, setFilteredPlans] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);
 
//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }
 
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
 
//         console.log("Response:", response.data);
 
//         const allSubscriptions = response.data.groupedSubscriptions || {};
//         setGroupedSubscriptions(allSubscriptions);
 
//         const relevantPlans = Object.entries(allSubscriptions).filter(
//           ([planName]) =>
//             planName === "Individual Plan Budget" ||
//             planName === "Individual Plan Elite" ||
//             planName === "Combo Plan Budget" ||
//             planName === "Combo Plan Elite"
//         );
 
//         const plans = relevantPlans.reduce((acc, [planName, details]) => {
//           if (planName.includes("Individual Plan")) {
//             acc["Individual"] = {
//               ...(acc["Individual"] || {}),
//               [planName.split(" ")[2]]: details,
//             };
//           } else {
//             acc[planName] = details;
//           }
//           return acc;
//         }, {});
 
//         setFilteredPlans(Object.keys(plans));
//       } catch (error) {
//         console.error(
//           "Error fetching subscriptions:",
//           error.response?.data || error.message
//         );
//       }
//     };
 
//     fetchSubscriptions();
//   }, []);
 
 
 
//   const handleModalItemClick = (meal) => {
//     navigate(`user/IndividualPack${meal}`);
//     setShowModal(false);
//   };
 
//   const handleCardClick = (planName) => {
//     if (planName === "Combo Plan Budget") {
//       navigate("/user/BudgetCombo");
//     } else if (planName === "Combo Plan Elite") {
//       navigate("/user/EliteCombo");
//     } else if (planName === "Individual") {
//       const individualPlans = Object.entries(groupedSubscriptions).filter(
//         ([key]) =>
//           key === "Individual Plan Budget" || key === "Individual Plan Elite"
//       );
//       const modalDetails = individualPlans.reduce((acc, [key, value]) => {
//         const subPlan = key.split(" ")[2];
//         acc[subPlan] = value;
//         return acc;
//       }, {});
 
//       setModalData(modalDetails);
//       setShowModal(true);
//     } else {
//       console.log(`Unknown plan selected: ${planName}`);
//     }
//   };
  
//   const closeModal = () => {
//     setShowModal(false);
//     setModalData(null);
//   };
 
//   return (
//     <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>
 
//       <div className="plans-container">
//         {filteredPlans.map((planName) => (
//           <div
//             key={planName}
//             className="plan-card"
//             onClick={() => handleCardClick(planName)}
//           >
//             <h2 className="plan-name">{planName}</h2>
//           </div>
//         ))}
//       </div>
//       {showModal && modalData && (
//   <div className="mmodal">
//     <div className="modal-content">
//       <h2 className="modal-heading">Individual Plan Details</h2>
//       <table className="modal-table">
//         <thead>
//           <tr>
//             <th colSpan={3}>Budget</th>
//             <th colSpan={3}>Elite</th>
//           </tr>
//           <tr>
//                   <th onClick={() => handleModalItemClick("Breakfast")}>Breakfast</th>
//                   <th onClick={() => handleModalItemClick("Lunch")}>Lunch</th>
//                   <th onClick={() => handleModalItemClick("Dinner")}>Dinner</th>
//                   <th onClick={() => handleModalItemClick("Breakfast")}>Breakfast</th>
//                   <th onClick={() => handleModalItemClick("Lunch")}>Lunch</th>
//                   <th onClick={() => handleModalItemClick("Dinner")}>Dinner</th>
//             </tr>
//         </thead>

//       </table>
//       <button className="close-button" onClick={closeModal}>
//         Close
//       </button>
//     </div>
//   </div>
// )}  
//     </div>
//   );
// };
 
// export default SubscriptionPlan;

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import './SubscriptionPlan.css';

// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
//   const [filteredPlans, setFilteredPlans] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("Authorization token not found.");
//           return;
//         }

//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Response:", response.data);

//         const allSubscriptions = response.data.groupedSubscriptions || {};
//         setGroupedSubscriptions(allSubscriptions);

//         const relevantPlans = Object.entries(allSubscriptions).filter(
//           ([planName]) =>
//             planName === "Individual Plan Budget" ||
//             planName === "Individual Plan Elite" ||
//             planName === "Combo Plan Budget" ||
//             planName === "Combo Plan Elite"
//         );

//         const plans = relevantPlans.reduce((acc, [planName, details]) => {
//           if (planName.includes("Individual Plan")) {
//             acc["Individual"] = {
//               ...(acc["Individual"] || {}),
//               [planName.split(" ")[2]]: details,
//             };
//           } else {
//             acc[planName] = details;
//           }
//           return acc;
//         }, {});

//         setFilteredPlans(Object.keys(plans));
//       } catch (error) {
//         console.error(
//           "Error fetching subscriptions:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handleModalItemClick = (meal) => {
//     const planDetails = groupedSubscriptions["Individual Plan Budget"]?.[meal] || [];
//     navigate(`/user/IndividualPack${meal}`, { state: { meal, planDetails } });
//     setShowModal(false);
//   };

//   const handleCardClick = (planName) => {
//     if (planName === "Combo Plan Budget") {
//       navigate("/user/BudgetCombo");
//     } else if (planName === "Combo Plan Elite") {
//       navigate("/user/EliteCombo");
//     } else if (planName === "Individual") {
//       const individualPlans = Object.entries(groupedSubscriptions).filter(
//         ([key]) =>
//           key === "Individual Plan Budget" || key === "Individual Plan Elite"
//       );
//       const modalDetails = individualPlans.reduce((acc, [key, value]) => {
//         const subPlan = key.split(" ")[2];
//         acc[subPlan] = value;
//         return acc;
//       }, {});

//       setModalData(modalDetails);
//       setShowModal(true);
//     } else {
//       console.log(`Unknown plan selected: ${planName}`);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalData(null);
//   };

//   return (
//     <div className="main-container">
//       <header className="header">
//         <h1 className="home-heading">Choose Your Plan for Subscription!</h1>
//       </header>

//       <div className="plans-container">
//         {filteredPlans.map((planName) => (
//           <div
//             key={planName}
//             className="plan-card"
//             onClick={() => handleCardClick(planName)}
//           >
//             <h2 className="plan-name">{planName}</h2>
//           </div>
//         ))}
//       </div>
//       {showModal && modalData && (
//         <div className="mmodal">
//           <div className="modal-content">
//             <h2 className="modal-heading">Individual Plan Details</h2>
//             <table className="modal-table">
//               <thead>
//                 <tr>
//                   <th colSpan={3}>Budget</th>
//                   <th colSpan={3}>Elite</th>
//                 </tr>
//                 <tr>
//                   <th onClick={() => handleModalItemClick("Breakfast")}>Breakfast</th>
//                   <th onClick={() => handleModalItemClick("Lunch")}>Lunch</th>
//                   <th onClick={() => handleModalItemClick("Dinner")}>Dinner</th>
//                   <th onClick={() => handleModalItemClick("Breakfast")}>Breakfast</th>
//                   <th onClick={() => handleModalItemClick("Lunch")}>Lunch</th>
//                   <th onClick={() => handleModalItemClick("Dinner")}>Dinner</th>
//                 </tr>
//               </thead>
//             </table>
//             <button className="close-button" onClick={closeModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionPlan;








import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SubscriptionPlan.css';

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [groupedSubscriptions, setGroupedSubscriptions] = useState({});
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token not found.");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Response:", response.data);

        const allSubscriptions = response.data.groupedSubscriptions || {};
        setGroupedSubscriptions(allSubscriptions);

        const relevantPlans = Object.entries(allSubscriptions).filter(
          ([planName]) =>
            planName === "Individual Plan Budget" ||
            planName === "Individual Plan Elite" ||
            planName === "Combo Plan Budget" ||
            planName === "Combo Plan Elite"
        );

        const plans = relevantPlans.reduce((acc, [planName, details]) => {
          if (planName.includes("Individual Plan")) {
            acc["Individual"] = {
              ...(acc["Individual"] || {}),
              [planName.split(" ")[2]]: details,
            };
          } else {
            acc[planName] = details;
          }
          return acc;
        }, {});

        setFilteredPlans(Object.keys(plans));
      } catch (error) {
        console.error(
          "Error fetching subscriptions:",
          error.response?.data || error.message
        );
      }
    };

    fetchSubscriptions();
  }, []);

  const handleModalItemClick = (meal, planType) => {
    const planDetails =
      groupedSubscriptions[`Individual Plan ${planType}`]?.[meal] || [];
    navigate(`/user/IndividualPack${meal}${planType}`, { state: { meal, planDetails } });
    setShowModal(false);
  };

  const handleCardClick = (planName) => {
    if (planName === "Combo Plan Budget") {
      navigate("/user/BudgetCombo");
    } else if (planName === "Combo Plan Elite") {
      navigate("/user/EliteCombo");
    } else if (planName === "Individual") {
      const individualPlans = Object.entries(groupedSubscriptions).filter(
        ([key]) =>
          key === "Individual Plan Budget" || key === "Individual Plan Elite"
      );
      const modalDetails = individualPlans.reduce((acc, [key, value]) => {
        const subPlan = key.split(" ")[2];
        acc[subPlan] = value;
        return acc;
      }, {});

      setModalData(modalDetails);
      setShowModal(true);
    } else {
      console.log(`Unknown plan selected: ${planName}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1 style={{fontSize:'2.5rem'}} className="home-heading">Choose Your Plan for Subscription!</h1>
      </header>

      <div className="plans-container">
        {filteredPlans.map((planName) => (
          <div
            key={planName}
            className="plan-card"
            onClick={() => handleCardClick(planName)}
          >
            <h2 className="plan-name">{planName}</h2>
          </div>
        ))}
      </div>
      {showModal && modalData && (
        <div className="mmodal">
          <div className="modal-content">
            <h2 className="modal-heading">Individual Plan Details</h2>
            <table className="modal-table">
              <thead>
                <tr>
                  <th colSpan={3}>Budget</th>
                  <th colSpan={3}>Elite</th>
                </tr>
                <tr>
                  <th onClick={() => handleModalItemClick("Breakfast", "Budget")}>Breakfast</th>
                  <th onClick={() => handleModalItemClick("Lunch", "Budget")}>Lunch</th>
                  <th onClick={() => handleModalItemClick("Dinner", "Budget")}>Dinner</th>
                  <th onClick={() => handleModalItemClick("Breakfast", "Elite")}>Breakfast</th>
                  <th onClick={() => handleModalItemClick("Lunch", "Elite")}>Lunch</th>
                  <th onClick={() => handleModalItemClick("Dinner", "Elite")}>Dinner</th>
                </tr>
              </thead>
            </table>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlan;

