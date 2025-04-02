

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./SubscriptionPlan.css";
// import { AiFillCloseSquare } from "react-icons/ai";

// const SubscriptionPlan = () => {
//   const navigate = useNavigate();
//   const [subscriptions, setSubscriptions] = useState({});
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
//         );
//         console.log("Fetched plans:", response.data);
//         setSubscriptions(response.data.formattedSubscriptions || {});
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error.message);
//       }
//     };

//     fetchSubscriptions();
//   }, []);

//   const handlePlanClick = (planName) => {
//     setSelectedPlan(planName);
//   };

//   const handleClosePopup = () => {
//     setSelectedPlan(null);
//   };

//   const handleMealClick = (planName, planType, mealType) => {
//     navigate(`/${planName}/${planType}/${mealType}`);
//   };

//   return (
//     <>
//     <div className="subscription-container">

//     <header className="header">
//         <h1 className="choose">Choose Your Plan for Subscription!</h1>
//       </header>
//     <section >
//       {Object.keys(subscriptions).map((planName) => (
//         <div className={`plan-section ${planName.toLowerCase()}`} key={planName}>
//           <div className="description-card" id="individual-section">
//             {planName === "Individual Plan" && (
//               <p className="plann-description">
//                {planName} - You can subscribe to only one meal (Breakfast, Lunch, or Dinner).

//               </p>
//             )}
           
//             {planName === "Combo Plan" && (
//               <p className="plann-description" id="combo-section" >
//                 {planName} - This plan includes all three meals: Breakfast, Lunch, and Dinner.
//               </p>
//             )}

//             <div className="plan-card" onClick={() => handlePlanClick(planName)}>
//               <h2 className="plan-name">{planName}</h2>
//             </div>
//           </div>
//         </div>
//       ))}

//       {selectedPlan && subscriptions[selectedPlan] && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <button className="close--btnn" onClick={handleClosePopup}>
//               <AiFillCloseSquare />
//             </button>
//             <h2 className="heading-head">{selectedPlan}</h2>
//             <div className="plans-details">
//               <div className="plan-types-container">
//                 {Object.entries(subscriptions[selectedPlan]).map(([planType, meals]) => (
//                   <div key={planType} className="plan-type">
//                     <h3>{planType}</h3>
//                     <div className="meals-container">
//                       {Object.keys(meals).map((mealType) => (
//                         <div
//                           key={mealType}
//                           className="meal-card"
//                           onClick={() => handleMealClick(selectedPlan, planType, mealType)}
//                         >
//                           {mealType}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//     </div>
// </>

//   );
// };

// export default SubscriptionPlan;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPlan.css";
import { AiFillCloseSquare } from "react-icons/ai";
 
const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
 
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );
        console.log("Fetched plans:", response.data);
        setSubscriptions(response.data.formattedSubscriptions || {});
      } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
      }
    };
 
    fetchSubscriptions();
  }, []);
 
  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
  };
 
  const handleClosePopup = () => {
    setSelectedPlan(null);
  };
 
  const handleMealClick = (planName, planType, mealType) => {
    navigate(`${planName}/${planType}/${mealType}`);
  };
 
  return (
    <>
    <div className="subscription-container">
 
    <header className="header">
        <h1 className="choose">Choose Your Plan for Subscription!</h1>
      </header>
    <section >
      {Object.keys(subscriptions).map((planName) => (
        <div className={`plan-section ${planName.toLowerCase()}`} key={planName}>
          <div className="description-card" id="individual-section">
            {planName === "Individual Plan" && (
              <p className="plann-description">
               {planName} - You can subscribe to only one meal (Breakfast, Lunch, or Dinner).
 
              </p>
            )}
           
            {planName === "Combo Plan" && (
              <p className="plann-description" id="combo-section" >
                {planName} - This plan includes all three meals: Breakfast, Lunch, and Dinner.
              </p>
            )}
 
            <div className="plan-card" onClick={() => handlePlanClick(planName)}>
              <h2 className="plan-name">{planName}</h2>
            </div>
          </div>
        </div>
      ))}
 
      {selectedPlan && subscriptions[selectedPlan] && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close--btnn" onClick={handleClosePopup}>
              <AiFillCloseSquare />
            </button>
            <h2 className="heading-head">{selectedPlan}</h2>
            <div className="plans-details">
              <div className="plan-types-container">
                {Object.entries(subscriptions[selectedPlan]).map(([planType, meals]) => (
                  <div key={planType} className="plan-type">
                    <h3>{planType}</h3>
                    <div className="meals-container">
                      {Object.keys(meals).map((mealType) => (
                        <div
                          key={mealType}
                          className="meal-card"
                          onClick={() => handleMealClick(selectedPlan, planType, mealType)}
                        >
                          {mealType}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    </div>
</>
 
  );
};
 
export default SubscriptionPlan;