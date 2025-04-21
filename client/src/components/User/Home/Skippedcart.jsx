import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Skippedcart.css";
import { useSidebar } from "../../Sidebar/SidebarContext";

const SkippedCart = () => {
  const { isOpen } = useSidebar();

  const [skippedCartDetails, setSkippedCartDetails] = useState([]);

  useEffect(() => {
    const fetchSkippedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/skipcart/getSkippedMeals`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data.skippedCartDetails);

        if (response.data.skippedCartDetails) {
          setSkippedCartDetails(response.data.skippedCartDetails);
        }
      } catch (error) {
        console.error("Error fetching skipped cart details:", error);
      }
    };

    fetchSkippedItems();
  }, []);

  const handleReorder = async (skippedItem) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/skipcart/reorderSkippedItem`,
        { skippedCartId: skippedItem.skipped_cart_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Order placed successfully");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error reordering item:", error);
      alert("Failed to place order");
    }
  };

  const isReorderable = (validityDate) => {
    const currentDate = new Date();
    const validity = new Date(validityDate);
    return currentDate <= validity;
  };

  const filteredSkippedCartDetails = skippedCartDetails?.filter(
    (subscription) => subscription.skipped_details.length > 0
  );

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <h2>Skipped Cart Items</h2>
      <div className="skipped-cart">
        {filteredSkippedCartDetails.map((subscription) => (
          <div
            key={subscription.user_subscription_id}
            className="subscription-card"
          >
            <h3>Subscription: {subscription.subscription_details.meal_type}</h3>
            <p>Duration: {subscription.subscription_details.duration} days</p>
            {subscription.subscription_details.food_items.length > 0 && (
              <>
                <p>Food Items:</p>
                <ul>
                  {subscription.subscription_details.food_items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </>
            )}

            {subscription.skipped_details.length > 0 && (
              <div className="skipped-details">
                <h4>Skipped Items</h4>
                {subscription.skipped_details.map((skippedItem) => (
                  <div
                    key={skippedItem.skipped_cart_id}
                    className="skipped-item"
                  >
                    {subscription.subscription_details.food_items
                      .filter(
                        (foodItem) =>
                          foodItem.id === skippedItem.skipped_meal_item_id
                      )
                      .map((filteredItem) => (
                        <p key={filteredItem.id}>
                          Skipped Item: {filteredItem.name}
                        </p>
                      ))}

                    <p>
                      Skipped Date:{" "}
                      {new Date(skippedItem.skipped_date).toLocaleString()}
                    </p>
                    <p>
                      Validity:{" "}
                      {new Date(skippedItem.validity_date).toLocaleString()}
                    </p>

                    {isReorderable(skippedItem.validity_date) && (
                      <button
                        onClick={() => handleReorder(skippedItem)}
                        className="reorder-button"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkippedCart;
