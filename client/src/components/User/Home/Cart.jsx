import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import MainUserSidebar from '../UserSidebar/MainUserSidebar';



const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);
  
  const handleRemoveFromCart = (itemName) => {
    const updatedItems = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };
  
  const handleCheckout = () => {
    alert('Redirecting to Payment!');
    localStorage.removeItem('cartItems');
  };
    
  return (
    <>
    <MainUserSidebar/> 
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
            {cartItems.map((item, index) => (
              <tr key={index}>
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
  
        <Link to={'/user/PaymentCart'}>
          <button onClick={handleCheckout}>Checkout to Payment</button>
        </Link>
      </div>
    </>
  );
}  

export default Cart;




