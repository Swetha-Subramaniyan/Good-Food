import React, { useEffect, useState } from "react";
import "./EliteCombo.css";
import { IoSunnyOutline, IoPartlySunnyOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";
import idly from "../../../assets/idly.jpg";
import rice from "../../../assets/Rice.jpg";
import biriyani from "../../../assets/biriya.jpg";
import chappathi from "../../../assets/chappathi.jpg";
import pongal from "../../../assets/pongal.jpg";
import StarRatings from "../Home/StarRatings";
import axios from "axios";
import SignIn from "../OverallHome/SignIn";
import { useNavigate } from "react-router-dom";
const EliteCombo = () => {

  const [error, setError] = useState("");
  const [plans, setPlans] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isSignInVisible, setIsSignInVisible] = useState(false);


  const navigate = useNavigate();


  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/sub/names`
        );
        console.log("API Response:", response.data);
  
        // Extract Breakfast Budget plans
        const budgetPlans = response.data.formattedSubscriptions["Combo Plan"]["Elite"].filter(
          (plan) => plan.meal_type === "Combo"
        );
  
        setPlans(budgetPlans);
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/foodMenu/getWithID`,
        { subscription_id: planId }
      );
      console.log("Food Items fetched:", response.data);

      const fetchedItems =
        response.data.menuWithID?.map((item) => item.FoodItems) || [];
      setFoodItems(fetchedItems);
    } catch (error) {
      console.error(
        "Error fetching food items:",
        error.response?.data || error.message
      );
      setFoodItems([]);
      setError("Failed to fetch food items. Please try again.");
    }
  };

  // const handleSubscribe = async () => {
  //   if (!selectedPlanId) {
  //     alert("Please select a plan first.");
  //     return;
  //   }
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     setIsSignInVisible(true);
  //     return;
  //   }
  //   navigate(`/user/Payment/${selectedPlanId}`);
    
  // };


  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      alert("Please select a plan first.");
      return;
    }
    const token = localStorage.getItem("token");
  
    if (!token) {
      localStorage.setItem("pendingSubscription", selectedPlanId); // Store the pending subscription ID
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
      <div className="backgrd">
        <div className="listt">Choose your Subscription Plans</div>
        <div className="sub-add">
          <button onClick={handleSubscribe}>Subscribe</button>{" "}
        </div>
        <br />
        <br /> <br />
        {error && <div className="error">{error}</div>}
        <div className="days">
          {loading ? (
            <div>Loading...</div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-item ${
                  selectedPlanId === plan.id ? "selected" : ""
                }`}
                onClick={() => handlePlanClick(plan.id)}
              >
                <div>
                  {plan.days} Days - ₹{plan.price}
                </div>
              </div>
            ))
          )}

        </div>
        {isSignInVisible && (
          <SignIn isVisible={isSignInVisible} onClose={handleCloseSignIn} />
        )}

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
        <div className="break">
          <div className="breakfast-outt">
            {" "}
            <IoPartlySunnyOutline />
            <span className="fastt"> Breakfast </span>Order before 11:00AM{" "}
          </div>
        </div>
        <div className="photo">
          <div>
            <div className="days-align"> Monday</div> <br />
            <img src={idly} alt="idly" />
            <br />
            <h6>
              {" "}
              Idly+chutney+sambar <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <div className="days-align"> Tuesday</div> <br />
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <div className="days-align"> Wednesday</div> <br />
            <img src={rice} alt="idly" />
            <br />
            <h6>
              {" "}
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <div className="days-align"> Thursday</div> <br />
            <img src={biriyani} alt="dosa" />
            <br />
            <h6>
              {" "}
              Chicken Biriyani <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <div className="days-align"> Friday</div> <br />
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <div className="days-align"> Saturday</div> <br />
            <img src={rice} alt="idly" />
            <br />
            <h6>
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>

          <div>
            <div className="days-align"> Sunday</div> <br />
            <img src={chappathi} alt="idly" />
            <br />
            <h6>
              {" "}
              Chappathi <br /> <StarRatings />
            </h6>
          </div>
        </div>
        <div className="break">
          <div className="breakfast-outt">
            {" "}
            <IoSunnyOutline />
            <span className="fastt"> Lunch </span> Order before 3:00AM{" "}
          </div>
        </div>
        <div className="photo">
          <div>
            <img src={idly} alt="idly" />
            <br />
            <h6>
              {" "}
              Idly+chutney+sambar <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={rice} alt="idly" />
            <br />
            <h6>
              {" "}
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={biriyani} alt="dosa" />
            <br />
            <h6>
              {" "}
              Chicken Biriyani <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={rice} alt="idly" />
            <br />
            <h6>
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>

          <div>
            <img src={chappathi} alt="idly" />
            <br />
            <h6>
              {" "}
              Chappathi <br /> <StarRatings />
            </h6>
          </div>
        </div>
        <div className="break">
          <div className="breakfast-outt">
            {" "}
            <MdOutlineModeNight /> <span className="fastt"> Dinner </span> Order
            before 7:00PM{" "}
          </div>
        </div>
        <div className="photo">
          <div>
            <img src={idly} alt="idly" />
            <br />
            <h6>
              {" "}
              Idly+chutney+sambar <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={rice} alt="idly" />
            <br />
            <h6>
              {" "}
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={biriyani} alt="dosa" />
            <br />
            <h6>
              {" "}
              Chicken Biriyani <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={pongal} alt="dosa" />
            <br />
            <h6>
              {" "}
              Pongal+sambar+vada <br /> <StarRatings />
            </h6>
          </div>
          <div>
            <img src={rice} alt="idly" />
            <br />
            <h6>
              Rice + Chicken gravy <br /> <StarRatings />
            </h6>
          </div>

          <div>
            <img src={chappathi} alt="idly" />
            <br />
            <h6>
              {" "}
              Chappathi <br /> <StarRatings />
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliteCombo;














