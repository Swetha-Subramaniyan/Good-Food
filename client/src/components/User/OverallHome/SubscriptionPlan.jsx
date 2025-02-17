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
 
  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         console.error("Authorization token not found.");
  //         return;
  //       }
 
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
 
  //       console.log("Response:", response.data);
 
  //       const allSubscriptions = response.data.groupedSubscriptions || {};
  //       setGroupedSubscriptions(allSubscriptions);
 
  //       const relevantPlans = Object.entries(allSubscriptions).filter(
  //         ([planName]) =>
  //           planName === "Individual Plan Budget" ||
  //           planName === "Individual Plan Elite" ||
  //           planName === "Combo Plan Budget" ||
  //           planName === "Combo Plan Elite"
  //       );
 
  //       const plans = relevantPlans.reduce((acc, [planName, details]) => {
  //         if (planName.includes("Individual Plan")) {
  //           acc["Individual"] = {
  //             ...(acc["Individual"] || {}),
  //             [planName.split(" ")[2]]: details,
  //           };
  //         } else {
  //           acc[planName] = details;
  //         }
  //         return acc;
  //       }, {});
 
  //       setFilteredPlans(Object.keys(plans));
  //     } catch (error) {
  //       console.error(
  //         "Error fetching subscriptions:",
  //         error.response?.data || error.message
  //       );
  //     }
  //   };
 
  //   fetchSubscriptions();
  // }, []);


  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
  
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`,
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
    <> 
     <div className="main-container">
      <header className="header">
        <h1 style={{fontSize:'2.5rem'}} className="choose">Choose Your Plan for Subscription!</h1>
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
      {/* {showModal && modalData && (
        <div className="moddal">
          <div className="modal-content" style={{width:'500rem', height:'20rem'}}>
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
      )} */}

{showModal && modalData && (
  <div className="modal-overlay">
    {/* <div className="modal-content"> */}
    <div className="modal-content" style={{width:'500rem', height:'30rem'}}>
      <h2 className="modal-heading">Individual Plan Details</h2>

      <div className="plan-container">
        {/* Budget Column (Left Side) */}
        <div className="plan-column">
          <h3 className="plan-title">Budget</h3>
          <div className="meal-card" onClick={() => handleModalItemClick("Breakfast", "Budget")}>
            Breakfast
          </div>
          <div className="meal-card" onClick={() => handleModalItemClick("Lunch", "Budget")}>
            Lunch
          </div>
          <div className="meal-card" onClick={() => handleModalItemClick("Dinner", "Budget")}>
            Dinner
          </div>
        </div>

        {/* Elite Column (Right Side) */}
        <div className="plan-column">
          <h3 className="plan-title">Elite</h3>
          <div className="meal-card" onClick={() => handleModalItemClick("Breakfast", "Elite")}>
            Breakfast
          </div>
          <div className="meal-card" onClick={() => handleModalItemClick("Lunch", "Elite")}>
            Lunch
          </div>
          <div className="meal-card" onClick={() => handleModalItemClick("Dinner", "Elite")}>
            Dinner
          </div>
        </div>
      </div>

      <button className="close-button" onClick={closeModal}>X</button>
    </div>
  </div>
)}



     </div>

    </>
  );
};
 
export default SubscriptionPlan;