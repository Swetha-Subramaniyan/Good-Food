

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






import React, { useState, useEffect } from "react";
import "./Skippedcart.css";
const Skippedcart = () => {
  const [skippedMeals, setSkippedMeals] = useState([
    { date: "11-02-2025", mealType: "Lunch", status: "Pending", expiresIn: 10 },
    { date: "12-02-2025", mealType: "Breakfast", status: "Reorder Available", expiresIn: 5 },

  ]);
  
  const [totals, setTotals] = useState(0);

  useEffect(() => {
    const totalSkipped = skippedMeals.length;
    setTotals(totalSkipped);
  }, [skippedMeals]);

  const handleReorder = (index) => {
    const updatedMeals = [...skippedMeals];
    updatedMeals[index].status = "Reordered";
    setSkippedMeals(updatedMeals);
  };

  return (
    <> 
      <h2 className="skipped-head">Skipped Cart List</h2>
      <p className="info-text">{totals} Meal(s) pending to order</p>
      
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
            <tr key={index}> 
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

