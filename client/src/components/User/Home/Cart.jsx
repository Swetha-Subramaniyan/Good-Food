// import React, { useState } from 'react';
// import './Cart.css';
// import { Link } from 'react-router-dom';



// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);


  



//   const handleRemoveFromCart = (itemName) => {
//     const updatedItems = cartItems.filter(item => item.name !== itemName);
//     setCartItems(updatedItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedItems));
//   };

  


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
//             {cartItems.map((item, index) => (
//               <tr key={index}>
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

    
//           <Link to={'/user/PaymentCart'}> 
//             <button>Checkout to Payment</button>
//           </Link>
//       </div>
//     </>
//   );
// };

// export default Cart;




import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // 🔹 Fetch Cart Items on Component Mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/cart/get`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("CART DATA:", response.data);

        // 🔹 Extract items from response
        const items = response.data.cartItems.map((cartItem) => ({
          id: cartItem.id,
          name: cartItem.item_name,
          price: cartItem.price,
          quantity: 1, // Default quantity
          totalPrice: cartItem.price * 1, // Calculate total price
        }));

        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // 🔹 Handle Removing Item from Cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/cart/removeCart/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 🔹 Update state after deletion
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <>
      <div className="order-header">Added Items</div>
      <br />
      <div>
        <table className="styled-table">
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
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.totalPrice}</td>
                <td>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to={"/user/PaymentCart"}>
          <button>Checkout to Payment</button>
        </Link>
      </div>
    </>
  );
};

export default Cart;
