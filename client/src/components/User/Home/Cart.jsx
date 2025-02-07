// // import React from 'react'
// // import './Cart.css'


// // const Cart = () => {
// //   return (
// //     <> 
    
// //     <div className='order-header'> Added Items </div>
// //     <br/>

// //     <div > 
// //       <table className='styled-table'> 
// //         <tr> 
// //           <th> Item </th>
// //           <th> Price </th>
// //           <th> Quantity </th>
// //           <th> Total Price </th>
// //           <th> Action </th>
// //         </tr>
// //         <tr> 
// //           <td> Chicken Biriyani </td>
// //           <td> ₹60 </td>
// //           <td> 2 </td>
// //           <td> ₹120 </td>
// //           <td> Delete </td>
// //         </tr>
// //       </table>
// //       <div className='cart-checkout'>
// //         <button style={{display:'flex', justifyContent:'center'}}> Checkout to Payment</button> </div>
// //     </div>
// //     </>
    
// //   )
// // }

// // export default Cart






// import React, { useState, useEffect } from 'react';
// import './Cart.css';
// import { Link } from 'react-router-dom';

// const Cart = () => {

//   const [cartItems, setCartItems] = useState([]);
//   useEffect(() => {
//     // Retrieve cart items from localStorage
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedItems);
//   }, []);

//   const handleRemoveFromCart = (itemName) => {
//     // Remove the item from the state and localStorage
//     const updatedItems = cartItems.filter(item => item.name !== itemName);
//     setCartItems(updatedItems);

//     // Update localStorage after removal
//     localStorage.setItem('cartItems', JSON.stringify(updatedItems));
//   };

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

//   return (
//     <>
//       <div className='order-header'>Added Items</div>
//       <br />
//       <div>
//         <table className='styled-table'>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.name}>
//                 <td>{item.name}</td>
//                 <td>₹{item.price}</td>
//                 <td>{item.quantity}</td>
//                 <td>₹{item.totalPrice}</td>
//                 <td>
//                   <button onClick={() => handleRemoveFromCart(item.name)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={{marginLeft:'10rem', fontWeight:'bold'}}> 
//           Pay for Add Ons
//         </div>
        
//         <div className='cart-checkout'>
//           <p>Total: ₹{totalPrice}</p>
//           <Link to={'/user/PaymentCart'}> 
//           <button style={{ display: 'flex', justifyContent: 'center',  }}>Checkout to Payment</button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;





import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater } from '@fortawesome/free-solid-svg-icons';
import { faPlateWheat } from '@fortawesome/free-solid-svg-icons';
 
 
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
 
 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [includeWaterBottle, setIncludeWaterBottle] = useState(false);
  const [includePlate, setIncludePlate] = useState(false);
 
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);
 
  const handleRemoveFromCart = (itemName) => {
    const updatedItems = cartItems.filter(item => item.name !== itemName);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };
 
  const waterBottleCost = includeWaterBottle ? 15 : 0;
  const plateCost = includePlate ? 20 : 0;
 
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0) + waterBottleCost + plateCost;
 
  return (
    <>
      <div className='order-header'>Added Items</div>
      <br />
      <div>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.totalPrice}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(item.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginLeft: '10rem', fontWeight: 'bold', fontSize:'1.5rem' }}>
 
        </div>
 
        <div className='waterbottle'>
        <div>          
          <h4>  <FontAwesomeIcon icon={faBottleWater} />  Water Bottle (₹15)  
 
          <Checkbox {...label}
            checked={includeWaterBottle}
            onChange={() => setIncludeWaterBottle(!includeWaterBottle)}          
          />              
        </h4>
        </div>
        <div>
          <h4> <FontAwesomeIcon icon={faPlateWheat} />  Plate (₹20)
          <Checkbox {...label}
          checked={includePlate}
          onChange={() => setIncludePlate(!includePlate)}      
          />              
          </h4>
        </div>
        </div>
 
        <div className='cart-checkout'>
          <p>Total: ₹{totalPrice}</p>
          <Link to={'/user/PaymentCart'}>
            <button>Checkout to Payment</button>
          </Link>
        </div>
      </div>
    </>
  );
};
 
export default Cart;