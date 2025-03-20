import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignIn from '../OverallHome/SignIn';
import './PlanDetails.css'

 
const PlanDetails = () => {

  const [error, setError] = useState('');  
  const { planName, planType, mealType } = useParams();
  const [mealDetails, setMealDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );

        console.log("API Response:", response.data);
 
        const subscriptions = response.data.formattedSubscriptions;
        if (
          subscriptions &&
          subscriptions[planName] &&
          subscriptions[planName][planType] &&
          subscriptions[planName][planType][mealType]
        ) {
          setMealDetails(subscriptions[planName][planType][mealType]);
        }
      } catch (error) {
        console.log("Error fetching subscription details:", error);
      } finally {
        setLoading(false);
      }
    };

    
 
    fetchPlans();
  }, [planName, planType, mealType]);


   useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/getMeal/${planName}/${mealType}/${planType}`,
          { headers: { Authorization: `Bearer ${token}` } }
 
        );
        console.log("Food Items Response:", response.data);
        setFoodItems(response.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
 
    fetchFoodItems();
  }, [planName, mealType, planType]);
 
  const handlePlanClick = (planId) => {
    setSelectedPlanId(planId);
 
  };
  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      alert('Please select a plan first.');
      return;
    }
 
    const token = localStorage.getItem('token');
 
    if (!token) {
      localStorage.setItem('pendingSubscription', selectedPlanId);
      setIsSignInVisible(true);
      return;
    }
    navigate(`/user/Payment/${selectedPlanId}`);
  };
  const handleCloseSignIn = () => {
    setIsSignInVisible(false);
  };
 
 
  return (
    <> 
<div className='backgrd'>
  <div className="choose-plan">
    <h2> Choose Your Subscription Plans </h2>
  </div>

  <div className="subscribe-section">
    <div className="plans-container">
      {loading ? (
        <p>Loading...</p>
      ) : mealDetails.length > 0 ? (
        mealDetails.map((plan) => (
          <div
            key={plan.id}
            className={`plan-item ${selectedPlanId === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanClick(plan.id)}
          >
            {plan.days} Days - ₹{plan.price}
          </div>
        ))
      ) : (
        <p>No meal details found for the selected option.</p>
      )}

<div className="food-items-container">
        <h3>Food Items in this Plan:</h3>
        {foodItems.length > 0 ? (
          <ul>
            {foodItems.map((food) => (
              <li >{food.item_name} </li>
            ))}
          </ul>
        ) : (
          <p>No food items available for this plan.</p>
        )}
      </div>
    </div>

    <div className="subscribe-button">
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  </div>

  {error && <div className="error">{error}</div>}
  {isSignInVisible && <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />}
</div>

    </>
  );
};
 
export default PlanDetails;