

// import React, { useState, useEffect } from "react";
// import "./Skippedcart.css";

// const Skippedcart = () => {

//   const [skippedMeals, setSkippedMeals] = useState([
//     { date: "11-02-2025", breakfast: 1, lunch: 1, dinner: 1 },
//     { date: "12-02-2025", breakfast: 1, lunch: 0, dinner: 1 },
//   ]);

//   const [totals, setTotals] = useState({ breakfast: 0, lunch: 0, dinner: 0 });  

//   useEffect(() => {
//     const totalBreakfast = skippedMeals.reduce((sum, item) => sum + item.breakfast, 0);
//     const totalLunch = skippedMeals.reduce((sum, item) => sum + item.lunch, 0);
//     const totalDinner = skippedMeals.reduce((sum, item) => sum + item.dinner, 0);

//     setTotals({ breakfast: totalBreakfast, lunch: totalLunch, dinner: totalDinner });
//   }, [skippedMeals]); 

//   return (
//     <> 
      
//       <h2 className="skipped-head"> Skipped Cart List </h2>

//       <table className="styled-table"> 
//         <thead>
//           <tr> 
//             <th>Date</th>
//             <th>Breakfast</th>
//             <th>Lunch</th>
//             <th>Dinner</th>
//           </tr>  
//         </thead>
//         <tbody>
//           {skippedMeals.map((meal, index) => (
//             <tr key={index}> 
//               <td>{meal.date}</td>
//               <td>{meal.breakfast}</td>
//               <td>{meal.lunch}</td>
//               <td>{meal.dinner}</td>
//             </tr>
//           ))}
//           <tr> 
//             <td><b>Total Quantity</b></td>
//             <td><b>{totals.breakfast}</b></td>
//             <td><b>{totals.lunch}</b></td>
//             <td><b>{totals.dinner}</b></td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Skippedcart;













// import React, { useState, useEffect } from "react";
// import "./Skippedcart.css";
// const Skippedcart = () => {
//   const [skippedMeals, setSkippedMeals] = useState([
//     { date: "11-02-2025", mealType: "Lunch", status: "Pending", expiresIn: 10 },
//     { date: "12-02-2025", mealType: "Breakfast", status: "Reorder Available", expiresIn: 5 },

//   ]);
  
//   const [totals, setTotals] = useState(0);

//   useEffect(() => {
//     const totalSkipped = skippedMeals.length;
//     setTotals(totalSkipped);
//   }, [skippedMeals]);

//   const handleReorder = (index) => {
//     const updatedMeals = [...skippedMeals];
//     updatedMeals[index].status = "Reordered";
//     setSkippedMeals(updatedMeals);
//   };

//   return (
//     <> 
//       <h2 className="skipped-head">Skipped Cart List</h2>
//       <p className="info-text">{totals} Meal(s) pending to order</p>
      
//       <table className="styled-table"> 
//         <thead>
//           <tr> 
//             <th>Date</th>
//             <th>Meal Type</th>
//             <th>Status</th>
//             <th>Expires In</th>
//             <th>Action</th>
//           </tr>  
//         </thead>
//         <tbody>
//           {skippedMeals.map((meal, index) => (
//             <tr key={index}> 
//               <td>{meal.date}</td>
//               <td>{meal.mealType}</td>
//               <td>{meal.status}</td>
//               <td>{meal.expiresIn} days</td>
//               <td>
//                 {meal.status === "Reorder Available" && (
//                   <button onClick={() => handleReorder(index)}>Reorder</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Skippedcart;











// import React, { useState, useEffect } from "react";
// import "./Skippedcart.css";

// const Skippedcart = () => {
//   const [skippedMeals, setSkippedMeals] = useState([
//     { date: "11-02-2025", mealType: "Lunch", status: "Pending", expiresIn: 10 },
//     { date: "12-02-2025", mealType: "Breakfast", status: "Reorder Available", expiresIn: 5 },
//   ]);
  
//   const [totals, setTotals] = useState(0);
  
//   useEffect(() => {
//     setTotals(skippedMeals.length);
//   }, [skippedMeals]);

//   const handleReorder = (index) => {
//     const updatedMeals = [...skippedMeals];
//     updatedMeals[index].status = "Reordered";
//     setSkippedMeals(updatedMeals);

//     // Retrieve existing cart items from localStorage
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//     // Define the meal price dynamically (adjust pricing logic as needed)
//     const mealPrices = {
//       Breakfast: 40,
//       Lunch: 60,
//       Dinner: 70
//     };

//     // Add the reordered meal in cart format
//     const reorderedItem = {
//       name: updatedMeals[index].mealType,
//       price: mealPrices[updatedMeals[index].mealType] || 50, // Default to ₹50 if not in mapping
//       quantity: 1,
//       totalPrice: mealPrices[updatedMeals[index].mealType] || 50, // price * quantity
//     };

//     // Update cart items in localStorage
//     const updatedCartItems = [...storedCartItems, reorderedItem];
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//   };

//   return (
//     <> 
//       <h2 className="skipped-head">Skipped Cart List</h2>
//       <p className="info-text">{totals} Meal(s) pending to order</p>
      
//       <table className="styled-table"> 
//         <thead>
//           <tr> 
//             <th>Date</th>
//             <th>Meal Type</th>
//             <th>Status</th>
//             <th>Expires In</th>
//             <th>Action</th>
//           </tr>  
//         </thead>
//         <tbody>
//           {skippedMeals.map((meal, index) => (
//             <tr key={index}> 
//               <td>{meal.date}</td>
//               <td>{meal.mealType}</td>
//               <td>{meal.status}</td>
//               <td>{meal.expiresIn} days</td>
//               <td>
//                 {meal.status === "Reorder Available" && (
//                   <button onClick={() => handleReorder(index)}>Reorder</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default Skippedcart;



import React, { useState, useEffect } from "react";
import "./Skippedcart.css";

const Skippedcart = () => {
  const [skippedMeals, setSkippedMeals] = useState([
    { id: 1, date: "11-02-2025", mealType: "Lunch", status: "Pending", expiresIn: 10 },
    { id: 2, date: "12-02-2025", mealType: "Breakfast", status: "Reorder Available", expiresIn: 5 },
  ]);

  useEffect(() => {
    // Updating total count dynamically based on non-reordered meals
    const pendingCount = skippedMeals.filter(meal => meal.status !== "Reordered").length;
    setTotalPendingMeals(pendingCount);
  }, [skippedMeals]);

  const [totalPendingMeals, setTotalPendingMeals] = useState(skippedMeals.length);

  const handleReorder = (index) => {
    const updatedMeals = [...skippedMeals];
    
    // Remove the meal from skippedMeals when reordered
    const reorderedMeal = updatedMeals.splice(index, 1)[0];
    setSkippedMeals(updatedMeals);

    // Update pending count
    setTotalPendingMeals(updatedMeals.length);

    // Retrieve existing cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Define meal prices dynamically
    const mealPrices = {
      Breakfast: 40,
      Lunch: 60,
      Dinner: 70
    };

    // Add the reordered meal to the cart
    const reorderedItem = {
      name: reorderedMeal.mealType,
      price: mealPrices[reorderedMeal.mealType] || 50, // Default ₹50 if not found
      quantity: 1,
      totalPrice: mealPrices[reorderedMeal.mealType] || 50, // price * quantity
    };

    // Update cart in localStorage
    const updatedCartItems = [...storedCartItems, reorderedItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <> 
      <h2 className="skipped-head">Skipped Cart List</h2>
      <p className="info-text">{totalPendingMeals} Meal(s) pending to order</p>
      
      <table className="styled-table"> 
        <thead>
          <tr> 
            <th>Date</th>
            <th>Meal Type</th>
            <th>Status</th>
            <th>Expires In</th>
            <th>Action</th>
          </tr>  
        </thead>
        <tbody>
          {skippedMeals.map((meal, index) => (
            <tr key={meal.id}> 
              <td>{meal.date}</td>
              <td>{meal.mealType}</td>
              <td>{meal.status}</td>
              <td>{meal.expiresIn} days</td>
              <td>
                {meal.status === "Reorder Available" && (
                  <button onClick={() => handleReorder(index)}>Reorder</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Skippedcart;
