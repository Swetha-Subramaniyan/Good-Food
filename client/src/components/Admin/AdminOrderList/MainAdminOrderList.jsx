import React from 'react'
import './MainAdminOrderList.css'
import MainSidebar from '../AdminSidebar/MainSidebar'

const MainAdminOrderList = () => {
  return (
    <> 
    <div> <MainSidebar/> </div>
    <table className="styled-table"> 
      <tr> 
        <th rowSpan={2}> User Name/ ID</th>
        <th colSpan={2}> Subscription Plan </th>
        <th rowSpan={2}> Breakfast</th>
        <th rowSpan={2}> Lunch</th>
        <th rowSpan={2}> Dinner</th>
      </tr>
      <tr> 
        
        <th> Budget </th>
        <th> Elite </th>
       
      </tr>
      <tr> 
        <td> GF001 </td>
        <td> Budget</td>
        <td> </td>
        <td> 1 </td>
        <td> 1</td>
        <td>1 </td>
      </tr>
    </table>



    <table className="styled-table">
          <thead>
            <tr className='style-head'>
            <th rowSpan={2}> User Name/ ID</th>
              <th colSpan={2}>Breakfast</th>
              <th colSpan={2}>Lunch </th>  
              <th colSpan={2} >Dinner</th>
            </tr>
            <tr> 
                <th> Budget</th>
                <th> Elite</th>
                <th> Budget</th>
                <th> Elite</th>
                <th> Budget</th>
                <th> Elite</th>                      
            </tr>
            
          </thead>
          <tbody>
            <tr> 
            <td> GF001 </td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>    
              <td>5</td>
              <td>6</td>           
            </tr>         
          </tbody>       
        </table>

    </>
  )
}

export default MainAdminOrderList 









// import React, { useState } from 'react';
// import './MainAdminOrderList.css';
// import MainSidebar from '../AdminSidebar/MainSidebar';

// const MainAdminOrderList = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clickedPlan, setClickedPlan] = useState('');

//   const handleCellClick = (plan) => {
//     setClickedPlan(plan);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setClickedPlan('');
//   };

//   return (
//     <>
//       <div>
//         <MainSidebar />
//       </div>

//       <table className="styled-table">
//         <thead>
//           <tr className="style-head">
//             <th colSpan={2}>Breakfast</th>
//             <th colSpan={2}>Lunch</th>
//             <th colSpan={2}>Dinner</th>
//           </tr>
//           <tr>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td onClick={() => handleCellClick('Breakfast - Budget')}>1</td>
//             <td onClick={() => handleCellClick('Breakfast - Elite')}>2</td>
//             <td onClick={() => handleCellClick('Lunch - Budget')}>3</td>
//             <td onClick={() => handleCellClick('Lunch - Elite')}>4</td>
//             <td onClick={() => handleCellClick('Dinner - Budget')}>5</td>
//             <td onClick={() => handleCellClick('Dinner - Elite')}>6</td>
//           </tr>
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close-btn" onClick={closeModal}>
//               X
//             </button>
//             <h3>Plan Details</h3>
//             <p>{clickedPlan}</p>
//             <div className="plan-options">
//               <button onClick={() => alert('Viewing Individual Plan')}>
//                 Individual Plan
//               </button>
//               <button onClick={() => alert('Viewing Combo Plan')}>
//                 Combo Plan
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MainAdminOrderList;
