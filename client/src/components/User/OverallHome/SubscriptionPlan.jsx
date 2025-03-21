import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPlan.css";
 
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
    navigate(`/user/${planName}/${planType}/${mealType}`);
  };
 
  return (
    <section className="subscription-container">
      <header className="header">
        <h1 className="choose">Choose Your Plan for Subscription!</h1>
      </header>
 
      {Object.keys(subscriptions).map((planName) => (
        <div className="plan-section" key={planName}>
          <div className="description-card">
            <p>{planName} - Select your meal type</p>
            <div className="plan-card" onClick={() => handlePlanClick(planName)}>
              <h2 className="plan-name">{planName}</h2>
            </div>
          </div>
        </div>
      ))}
 
      {/* Popup for selecting meals */}
      {selectedPlan && subscriptions[selectedPlan] && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <h2>{selectedPlan}</h2>
            <div className="plans-details">
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
      )}
    </section>
  );
};
 
export default SubscriptionPlan;