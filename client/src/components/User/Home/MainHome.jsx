// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './MainHome.css';
// import MainNavbar from '../Navbar/MainNavbar';
// import { IoMdLogOut } from "react-icons/io";
 
// const MainHome = () => {
//   const [additionalItems, setAdditionalItems] = useState([]);
    
  
 
  
 
//   useEffect(() => {
//     const fetchAdditionalItems = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAdditionalItems(response.data.foodItems);
//       } catch (error) {
//         console.error('Error fetching additional items:', error);
//       }
//     };
 
//     fetchAdditionalItems();
//   }, []);

 
//   return (
//     <> 
//     <button className='logout'> <IoMdLogOut /> Logout</button>
//       <MainNavbar />  
     
//       <div className="menu-container">
       
//         <h2>Menu</h2>
 
     


//         <div className="choose-menu">Choose more Delicious Foods</div>
 
//         <div className="additional-items">
//           <h2>Additional Items</h2>
//           {additionalItems.length > 0 ? (
//             <div className="food-items-container">
//               {additionalItems.map((item, index) => (
//                 <div key={index} className="food-item">
//                   <img
//                     src={item.image_url || '/placeholder.jpg'}
//                     alt={item.name}
//                     className="food-image"
//                   />
//                   <span>{item.name}</span>
//                   <div className="food-item-actions">
//                     <button>-</button>
//                     <button>+</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No additional items available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
 
// export default MainHome;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./MainHome.css";
// import MainNavbar from "../Navbar/MainNavbar";
// import { IoMdLogOut } from "react-icons/io";
// import { useParams } from "react-router-dom";

// const MainHome = () => {
//   const [additionalItems, setAdditionalItems] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [isComboPlan, setIsComboPlan] = useState(false); // Track if it's a combo plan
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAdditionalItems = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/extra/getAllAdditional`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAdditionalItems(response.data.foodItems);
//         console.log("Additional items:", response.data);
//       } catch (error) {
//         console.error("Error fetching additional items:", error);
//       }
//     };

//     const fetchFoodItems = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_SERVER_URL}/userSubscription/getFoodWithID/${id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
// console.log("Food Items :",response.data)
//         const data = response.data.data;
//         if (data.length > 0) {
//           const firstItem = data[0];
//           setIsComboPlan(firstItem.subscription_meal_type === "Combo");

//           if (firstItem.subscription_meal_type === "Combo") {
//             // Group food items by meal type
//             const groupedItems = {};
//             firstItem.FoodItems.forEach((food) => {
//               if (!groupedItems[food.food_meal_type]) {
//                 groupedItems[food.food_meal_type] = [];
//               }
//               groupedItems[food.food_meal_type].push(food);
//             });
//             setFoodItems(groupedItems);
//           } else {
//             // Individual plan: Store food items normally
//             setFoodItems(firstItem.FoodItems);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching food items:", error);
//       }
//     };

//     fetchAdditionalItems();
//     fetchFoodItems();
//   }, [id]);

//   return (
//     <>
//       <button className="logout">
//         <IoMdLogOut /> Logout
//       </button>
//       <MainNavbar />

//       <div className="menu-container">
//         {/* Display fetched food items */}
//         <div className="food-items-section">
//           <h2>Food Items</h2>
//           {isComboPlan ? (
//             // Render for Combo Plan
//             <div className="food-items-container">
//               {Object.keys(foodItems).map((mealType) =>
//                 foodItems[mealType].map((food, index) => (
//                   <div key={index} className="food-item">
//                   <h3 className="meal-type">{food.food_meal_type}</h3>

//                     <span>{food.item_name}</span>
//                     <div className="food-item-actions">
//                       <button>-</button>
//                       <button>+</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           ) : (
//             // Render for Individual Plan
//             <div className="food-items-container">
//               {foodItems.length > 0 ? (
//                 foodItems.map((food, index) => (
//                   <div key={index} className="food-item">
//                     <span>{food.item_name}</span>
//                     <div className="food-item-actions">
//                       <button>-</button>
//                       <button>+</button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No food items available.</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Display additional items */}
//         <div className="additional-items">
//           <h2>Additional Items</h2>
//           <br />
//           {additionalItems.length > 0 ? (
//             <div className="food-items-container">
//               {additionalItems.map((item, index) => (
//                 <div key={index} className="food-item">
//                   <img
//                     src={item.image_url || "/placeholder.jpg"}
//                     alt={item.name}
//                     className="food-image"
//                   />
//                   <span>{item.name}</span>
//                   <span>Price: ₹{item.price}</span>

//                   <div className="food-item-actions">
//                     <button>-</button>
//                     <button>+</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No additional items available.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainHome;





import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MainHome.css";
import MainNavbar from "../Navbar/MainNavbar";
import { IoMdLogOut } from "react-icons/io";
import { useParams } from "react-router-dom";

const MainHome = () => {
  const [additionalItems, setAdditionalItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);  // Stores food items by day
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

          // Store data by days
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
    <>
      <button className="logout">
        <IoMdLogOut /> Logout
      </button>
      <MainNavbar />

      <div className="menu-containerr">
        {/* Display Food Items Day-wise */}
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

                  {/* Show meal type only if isComboPlan is true */}
                  {isComboPlan && <h4 className="meal-type">{food.food_meal_type}</h4>}

                  <span>{food.item_name}</span>

                  <div className="food-item-actions">
                    <button>-</button>
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


        {/* Display Additional Items */}
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
    </>
  );
};

export default MainHome;

