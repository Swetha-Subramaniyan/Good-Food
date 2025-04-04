import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainHome.css";
import { IoMdLogOut } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useSidebar } from "../../Sidebar/SidebarContext";

const MainHome = () => {
  const { isOpen } = useSidebar();

  const [additionalItems, setAdditionalItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [isComboPlan, setIsComboPlan] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAdditionalItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdditionalItems(response.data.foodItems);
      } catch (error) {
        console.error("Error fetching additional items:", error);
      }
    };

    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getFoodWithID/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Food Items Response:", response.data);

        const data = response.data.data;
        if (data.length > 0) {
          const firstItem = data[0];
          setIsComboPlan(firstItem.subscription_meal_type === "Combo");
          setFoodItems(firstItem.days || []);
        }
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchAdditionalItems();
    fetchFoodItems();
  }, [id]);

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <button className="logout">
        <IoMdLogOut /> Logoutttttt
      </button>
      <div className="menu-containerr">
        <div className="food-items-section">
          <h2>Weekly Food Menu</h2>
          <br />

          <div className="weekly-menu">
            {foodItems.length > 0 ? (
              foodItems.map((day, index) => (
                <div key={index} className="day-card">
                  <h3 className="day-title">{day.day_name}</h3>

                  <div className="food-items-container">
                    {day.FoodItems && day.FoodItems.length > 0 ? (
                      day.FoodItems.map((food, i) => (
                        <div key={i} className="food-item">
                          <img
                            src={food.image_url || "/placeholder.jpg"}
                            alt={food.item_name}
                            className="food-image"
                          />

                          {isComboPlan && (
                            <h4 className="meal-type">{food.food_meal_type}</h4>
                          )}

                          <span>{food.item_name}</span>

                          <div className="food-item-actions">
                            <button>-</button> Add
                            <button>+</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No food items available for this day.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No food items available.</p>
            )}
          </div>
        </div>

        <div className="additional-items">
          <h2>Additional Items</h2>
          {additionalItems.length > 0 ? (
            <div className="food-items-container">
              {additionalItems.map((item, index) => (
                <div key={index} className="food-item">
                  <img
                    src={item.image_url || "/placeholder.jpg"}
                    alt={item.name}
                    className="food-image"
                  />
                  <span>{item.name}</span>
                  <span>Price: ₹{item.price}</span>

                  <div className="food-item-actions">
                    <button>-</button>
                    <button>+</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No additional items available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHome;
